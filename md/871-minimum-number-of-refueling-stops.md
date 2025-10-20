### Leetcode 871 (Hard): Minimum Number of Refueling Stops [Practice](https://leetcode.com/problems/minimum-number-of-refueling-stops)

### Description  
You are given a car that starts at position 0 with a tank containing **startFuel** liters of gas. There is a destination, **target** miles to the east. Along the way are gas stations, each at a specific location and with a certain amount of fuel. Each station is represented as **stations[i] = [positionᵢ, fuelᵢ]**, meaning station i is at position positionᵢ with fuelᵢ liters of gas.  
You can stop at a station if you arrive at its position with enough fuel, and if you do, you must take all the fuel from that station.  
The car consumes exactly 1 liter of fuel per mile traveled.  
Return the **minimum number of refueling stops** needed to reach the target, or -1 if the journey is impossible. If you can reach a gas station or the destination with exactly 0 fuel left, it is still considered “reached”.

### Examples  

**Example 1:**  
Input: `target=100, startFuel=10, stations=[[10,60],[20,30],[30,30],[60,40]]`  
Output: `2`  
Explanation:  
- Start with 10. Reach station at 10, fuel=0. Refuel by 60 (to 60).  
- Get to station at 60 (used 50 fuel), fuel=10. Refuel by 40 (to 50).  
- Reach target at 100 (used 40 fuel).

**Example 2:**  
Input: `target=100, startFuel=1, stations=[[10,100]]`  
Output: `-1`  
Explanation:  
- You can only travel 1 mile, but the first station is at 10 miles. Cannot reach it.

**Example 3:**  
Input: `target=100, startFuel=50, stations=[[25,25],[50,50]]`  
Output: `1`  
Explanation:  
- Use 50 fuel to get to station[1] at 50 miles, refuel by 50 (to 50). Now at mile 50, reach 100 using that 50 fuel.

### Thought Process (as if you’re the interviewee)  
First, I’d look into simulating all possible ways to take stops, but since there can be many stations this brute-force approach would be too slow (exponential). Instead, I’d want to efficiently choose which stations to stop at.

- I recognize that whenever I need fuel, I should have previously stopped at stations with the **most available fuel** to maximize my reach (“greedy by fuel”).
- As I pass by stations, I can put their fuel in a max-heap (priority queue), and **whenever I run out of fuel and can’t reach the next station or the target, I pop the largest previous station’s fuel** to refuel. This ensures I use the most “helpful” stations.
- Continue this process until the target is reached or it’s not possible.

The heap-greedy approach is optimal and faster (uses a heap to keep track of stations), with typical time complexity O(n log n).

Trade-offs:
- DP approach is possible (O(n²)), but greedy heap solution is faster and uses less space.

### Corner cases to consider  
- No stations along the way.
- All stations are past the target.
- startFuel already ≥ target (no stops needed).
- Station(s) at same location.
- Max integer overflows.
- Can reach a station or the target with exactly 0 fuel left.

### Solution

```python
def minRefuelStops(target, startFuel, stations):
    import heapq
    heap = []  # max-heap, but Python has min-heap so we'll store negative values
    stations.append([target, 0])  # treat the target as the last "station"
    fuel = startFuel
    prev_pos = 0
    refuels = 0

    for pos, fuel_available in stations:
        fuel -= pos - prev_pos  # spent fuel to reach this station
        # If we cannot reach the current station, refuel with the largest previous station(s)
        while heap and fuel < 0:
            # refuel at station with most fuel
            fuel += -heapq.heappop(heap)
            refuels += 1
        if fuel < 0:
            return -1
        heapq.heappush(heap, -fuel_available)  # store negated

        prev_pos = pos

    return refuels
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  n = number of stations. Each station is pushed once and potentially popped once from the heap (O(log n)), so total O(n log n).
- **Space Complexity:** O(n)  
  At most all station fuels are in the heap at one time (O(n)). Input storage is O(n), extra variables are constant.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you can stop at each station multiple times?  
  *Hint: Would the greedy approach still work, or would you need to adjust the station tracking?*

- How to return the actual path (sequence of stops) taken, not just the minimal number of stops?  
  *Hint: Track the sequence whenever you refuel via the heap, maybe pair fuel with station indices.*

- What changes if you don’t have to take all fuel at a station (i.e., partial refueling possible)?  
  *Hint: Modification to the heap, possibly simulate all options at each stop.*

### Summary
This problem uses the classic **Greedy + Heap (Priority Queue)** pattern: always refuel at the biggest prior station(s) if stuck, until you can reach the next milestone. This design also appears in interval problems (merge intervals), scheduling, and “last-moment choice” scenarios. Efficient heap usage ensures optimal time/space trade-offs.


### Flashcard
Use a max-heap to track passed stations; refuel from the heap when needed, counting stops until reaching the target.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
