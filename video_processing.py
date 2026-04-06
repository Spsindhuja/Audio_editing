import cv2
import numpy as np
import mediapipe as mp
from moviepy.editor import (VideoFileClip, AudioFileClip, concatenate_audioclips, CompositeVideoClip, 
                            ImageClip, TextClip, vfx)
from pydub import AudioSegment
from tqdm import tqdm
import openai  # For AI subtitles

# OpenAI Whisper API key (replace with your key)
OPENAI_API_KEY = "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"

def process_audio(audio_path, duration, volume=1.0, fade_in=2, fade_out=2, noise_reduction=True):
    """Process the audio: volume normalization, fade-in/out, noise reduction."""
    audio = AudioFileClip(r'C:\Users\S P Sindhuja\OneDrive\Desktop\Project\songs.mp3.mp3').subclip(0, duration).fadein(fade_in).fadeout(fade_out).volumex(volume)

    if noise_reduction:
        sound = AudioSegment.from_file(audio_path).normalize()
        sound.export("processed_audio.mp3", format="mp3")
        audio = AudioFileClip("processed_audio.mp3").subclip(0, duration)

    return audio

def generate_ai_subtitles(audio_path):
    """Generate subtitles using OpenAI Whisper."""
    openai.api_key = OPENAI_API_KEY
    with open(audio_path, "rb") as f:
        transcript = openai.Audio.transcribe("whisper-1", f)
    return [(line["text"], line["start"], line["end"]) for line in transcript["segments"]]

def add_subtitles(video, subtitles, font="Arial", fontsize=24, color="white", position=("center", "bottom")):
    """Add subtitles dynamically."""
    subtitle_clips = [TextClip(text, font=font, fontsize=fontsize, color=color).set_position(position)
                      .set_start(start).set_end(end) for text, start, end in subtitles]
    return CompositeVideoClip([video] + subtitle_clips)

def detect_faces(video_path):
    """Detect faces and blur them for privacy."""
    video = VideoFileClip(video_path)
    mp_face_detection = mp.solutions.face_detection
    face_detector = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

    def blur_faces(frame):
        image = cv2.cvtColor(np.array(frame), cv2.COLOR_RGB2BGR)
        results = face_detector.process(image)

        if results.detections:
            for detection in results.detections:
                bboxC = detection.location_data.relative_bounding_box
                x, y, w, h = (int(bboxC.xmin * image.shape[1]), int(bboxC.ymin * image.shape[0]), 
                              int(bboxC.width * image.shape[1]), int(bboxC.height * image.shape[0]))
                image[y:y+h, x:x+w] = cv2.GaussianBlur(image[y:y+h, x:x+w], (99, 99), 30)
        return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    return video.fl_image(blur_faces)

def remove_silence(audio_path, threshold=-40.0):
    """Trim silent parts of the audio based on volume level."""
    sound = AudioSegment.from_file(audio_path)
    non_silent_chunks = [chunk for chunk in sound if chunk.dBFS > threshold]
    trimmed_audio = sum(non_silent_chunks)
    trimmed_audio.export("trimmed_audio.mp3", format="mp3")
    return "trimmed_audio.mp3"

def apply_chroma_key(video_path, bg_path):
    """Replace green screen with a new background."""
    video = VideoFileClip(video_path)
    background = ImageClip(bg_path).set_duration(video.duration)

    def chroma_key(frame):
        hsv = cv2.cvtColor(frame, cv2.COLOR_RGB2HSV)
        mask = cv2.inRange(hsv, (35, 40, 40), (90, 255, 255))  # Detect green
        frame[mask > 0] = background.get_frame(0)[mask > 0]
        return frame

    return video.fl_image(chroma_key)

def add_effects(video, speed_factor=1.0, brightness=1.0, contrast=1.0, saturation=1.0, transition="fade"):
    """Apply speed, color correction, and transitions."""
    if speed_factor != 1.0:
        video = video.fx(vfx.speedx, speed_factor)
    video = video.fx(vfx.colorx, brightness)
    video = video.fx(vfx.colorx, contrast)
    video = video.fx(vfx.colorx, saturation)

    if transition == "fade":
        video = video.fadein(1).fadeout(1)

    return video

def add_audio_to_video(video_path, audio_path, output_path, **kwargs):
    """Master function: Adds AI subtitles, watermark, background music, chroma key, and effects."""
    print("Loading video...")
    video = VideoFileClip(video_path)
    audio = process_audio(remove_silence(audio_path), video.duration, **kwargs)

    # Add facial blurring if enabled
    if kwargs.get("blur_faces", False):
        print("Blurring faces...")
        video = detect_faces(video_path)

    # Replace green screen if enabled
    if kwargs.get("chroma_key_bg", None):
        print("Applying chroma key...")
        video = apply_chroma_key(video_path, kwargs["chroma_key_bg"])

    # Apply video effects
    video = add_effects(video, **kwargs)

    # Generate AI subtitles if enabled
    if kwargs.get("generate_subtitles", False):
        print("Generating AI subtitles...")
        subtitles = generate_ai_subtitles(audio_path)
        video = add_subtitles(video, subtitles)

    # Set the new processed audio
    video = video.set_audio(audio)

    # Save final video
    print("Processing final video...")
    video.write_videofile(output_path, codec="libx264", audio_codec="aac", fps=30, progress_bar=True)
    print("Done! Video saved as:", output_path)

# Example Usage
video_file = "input_video.mp4"
audio_file = "input_audio.mp3"
output_file = "output_final.mp4"
bg_image = "new_background.jpg"

add_audio_to_video(video_file, audio_file, output_file, volume=1.2, fade_in=3, fade_out=3,
                    blur_faces=True, generate_subtitles=True, chroma_key_bg=bg_image,
                    speed_factor=1.1, brightness=1.1, contrast=1.2, saturation=1.1, transition="fade")
