from moviepy.audio.io.AudioFileClip import AudioFileClip
from moviepy.audio.AudioClip import CompositeAudioClip, concatenate_audioclips
from moviepy.video.io.VideoFileClip import VideoFileClip
from moviepy.video.compositing.CompositeVideoClip import CompositeVideoClip

# Load the music file and the video file
music_file = "C:\Users\S P Sindhuja\Music\songs.mp3"
video_file = "C:\Users\S P Sindhuja\Videos\Captures.mp4"

# Designate the time to start inserting the video (in seconds)
start_time = 10  # Insert the video at 10 seconds into the music

# Load the audio from the music file
music_audio = AudioFileClip(music_file)

# Load the video file and extract its audio
video_audio = AudioFileClip(video_file)
video_duration = video_audio.duration

# Calculate the end time of the video insertion
end_time = start_time + video_duration

# Create a new audio clip that is a mix of the original audio and the video audio
# starting at the specified time
mixed_audio = CompositeAudioClip([music_audio.subclip(0, start_time),
                                  video_audio,
                                  music_audio.subclip(end_time)])

# Set the video to start playing the audio at the specified start time
video_with_audio = VideoFileClip(video_file).set_audio(video_audio.subclip(0, video_duration))

# Concatenate the music before and after the video audio
final_audio = concatenate_audioclips([music_audio.subclip(0, start_time),
                                      video_audio,
                                      music_audio.subclip(end_time)])

# Create a new video using the concatenated audio and the original video file
final_video = CompositeVideoClip([VideoFileClip(video_file).set_duration(video_duration).set_audio(final_audio)])

# Save the new video with the inserted video at the designated time
final_video.write_videofile("output_video.mp4", fps=30)

