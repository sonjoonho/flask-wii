from math import tan, radians

# Distance from the monitor in terms of number of monitor widths
DISTANCE_FROM_MONITOR = 2

def calculate_pos(alpha, beta):

    x_pos = -tan(radians(alpha)) * 2 * DISTANCE_FROM_MONITOR
    y_pos = -tan(radians(beta)) * 2 * DISTANCE_FROM_MONITOR

    return {"x": x_pos, "y": y_pos}

