--- Sleeptimer.lua: Simple Sleeptimer for MPV
-- TODO: Create Function to Decrease Timer
-- TODO: Create Function to Cancel Timer

local msg = require "mp.msg"
local utils = require "mp.utils"
local options = require "mp.options"

-- Basic Functions
function osd(str, sec)
	return mp.osd_message(str, sec)
end

-- Start Sleeptimer
function sleeptimer_start()
	if time_duration then
		time_now = os.time()
		time_pressed_diff = os.difftime(time_now, time_pressed)
		if time_pressed_diff < 3 then
			time_pressed = os.time()
			time_duration = time_duration + 1
			osd(string.format("Timer-Duration: Increased to %s minutes.",
				time_duration), 1)
		else
			-- TODO: Write as generic function to use time_calcutaion here and in loop_timer.
			-- TODO: Also rename functions to be more pleasant.
			local time_now = os.time()
			local time_start_diff = os.difftime(time_now, time_start)
			local time_left_seconds = time_duration * 60
			local time_left_diff = time_left_seconds - time_start_diff
			local time_left_diff_minutes = time_left_diff / 60

			if time_start_diff < time_left_seconds then
				osd(string.format("Timer-Duration: %.2f minutes left.", time_left_diff_minutes), 1)
			end
		end
	else
		time_start = os.time()
		time_pressed = os.time()
		time_duration = 1
		time_left_diff_minute_bool = false
		osd(string.format("Timer-Duration: Started at %s minutes.", time_duration), 1)
	end
end

-- Create Loop-Timer via MPV function
loop_timer = mp.add_periodic_timer(1, function()
	if time_duration then
		local time_now = os.time()
		local time_start_diff = os.difftime(time_now, time_start)
		local time_left_seconds = time_duration * 60
		local time_left_diff = time_left_seconds - time_start_diff
		print(string.format("%s Seconds left to end.", time_left_diff))

		if time_start_diff > time_left_seconds then
			-- TODO: Stop object loop-timer to rerun every second, till sleeptimer_start reruns again.
			osd(string.format("Time-Duration: Time is up!"), 10)
			time_duration = nil
			mp.command("quit")
		elseif time_left_diff < 58 and time_left_diff_minute_bool == false then
			osd(string.format("Timer-Duration: %s minutes left.", time_duration), 1)
			time_left_diff_minute_bool = true
		elseif time_left_diff < 30 then
			osd(string.format("Timer-Duration: %s seconds left.", time_left_diff), 1)
		end
	end
end)

-- TODO: Choose better Keybinding which doesn't overwrite anything default.
mp.add_key_binding("t", "sleeptimer", sleeptimer_start)
