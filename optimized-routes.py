# Challenge: Assume you have two globe salespeople, and you need to coordinate their routes of home visits so that all destinations are visited at once in as short a distance as possible. 

import random
import math

def euclidean_distance(p1, p2):
    return math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2)

def initial_routes(coordinates, num_salespeoples):
    random.shuffle(coordinates)
    return [coordinates[i::num_salespeoples] for i in range(num_salespeoples)]

def calculate_total_distance(routes):
    total_distance = 0
    for route in routes:
        total_distance += route_distance(route)
    return total_distance

def route_distance(route):
    distance = 0
    current_location = (0, 0)  # start at the warehouse
    for location in route:
        distance += euclidean_distance(current_location, location)
        current_location = location
    distance += euclidean_distance(current_location, (0, 0))  # return to the warehouse
    return distance

def swap_locations(route):
    new_route = route[:]
    i, j = random.sample(range(len(route)), 2)
    new_route[i], new_route[j] = new_route[j], new_route[i]
    return new_route

def optimize_routes(coordinates, num_salespeoples, max_iterations=1000, temperature=1000, cooling_rate=0.995):
    routes = initial_routes(coordinates, num_salespeoples)
    current_distance = calculate_total_distance(routes)
    
    for iteration in range(max_iterations):
        new_routes = []
        for route in routes:
            new_routes.append(swap_locations(route))
        
        new_distance = calculate_total_distance(new_routes)
        
        if new_distance < current_distance or random.random() < math.exp((current_distance - new_distance) / temperature):
            routes = new_routes
            current_distance = new_distance
        
        temperature *= cooling_rate
    
    return routes

# Example Usage
coordinates = [(2, 3), (5, 5), (9, 8), (4, 7), (6, 2)]
num_salespeoples = 2

routes = optimize_routes(coordinates, num_salespeoples)

print("Optimized Routes:", routes)

print("Total Distance:", calculate_total_distance(routes))
