### Leetcode 3633 (Easy): Earliest Finish Time for Land and Water Rides I [Practice](https://leetcode.com/problems/earliest-finish-time-for-land-and-water-rides-i)

### Description  
You are given two lists: one of **land rides** and one of **water rides** at a theme park. Each ride has its own start time and duration. You can pick any land ride and any water ride, and you must do **both rides** in either order (first land, then water; or first water, then land). You can start the first ride as soon as its start time, and the second ride as soon as *both* it is open *and* you finish the first ride. Find the **earliest time** by which you can finish both rides, considering all possible pairs and both orders.

### Examples  

**Example 1:**  
Input:  
land = [[2, 4], [8, 2]]  
water = [[6, 3]]  
Output: `9`  
*Explanation:  
Try pair (land → water):  
- Start land at 2, finish at 6  
- Water opens at 6, start at 6, finish at 9  
Try pair (water → land[1]):  
- Start water at 6, finish at 9  
- Land[1] opens at 8, so start at 9, finish at 11  
Earliest finish is 9.*

**Example 2:**  
Input:  
land = [[1, 3]]  
water = [[2, 5]]  
Output: `8`  
*Explanation:  
Try land first:  
- Start at 1, finish at 4  
- Water opens at 2, but you can't start until 4. So start at 4, finish at 9  
Try water first:  
- Start at 2, finish at 7  
- Land opens at 1, but you can't start until 7, finish at 10  
Earliest is 8 (land first).*

**Example 3:**  
Input:  
land = [[0, 2], [3, 2]]  
water = [[1, 2], [5, 1]]  
Output: `4`  
*Explanation:  
land at 0→2, water opens at 1, earliest after land finish is 2, so can do water next:  
- Start at max(1, 2) = 2, finish at 4  
All other combinations finish later.*

### Thought Process (as if you’re the interviewee)  
Start by thinking about **all possible pairs** between land and water rides. For each pair, consider both orders:

- land first, then water
    - Start land when it opens, finish, then wait (if necessary) for water to open and do water
- water first, then land
    - Start water when it opens, finish, then wait (if necessary) for land to open and do land

For each (land, water) pair, calculate:
- If land first:  
   land_finish = land_start + land_dur  
   water_start_actual = max(water_start, land_finish)  
   water_finish = water_start_actual + water_dur  
   finish_time = water_finish
- If water first:  
   water_finish = water_start + water_dur  
   land_start_actual = max(land_start, water_finish)  
   land_finish = land_start_actual + land_dur  
   finish_time = land_finish

Keep the minimum of all finish_times.

Brute-force is fine since the input limits are small: for L land rides and W water rides, check each pair (L×W), and in both orders (×2).  
No need to sort or optimize further.

### Corner cases to consider  
- One land ride or one water ride only.
- Both rides start at the exact same time.
- Ride durations are zero.
- Start times are in the future.
- Land and water times overlap or are separated by a long wait.

### Solution

```python
def earliest_finish_time(land, water):
    min_finish = float('inf')
    # Try all (land, water) pairs in both orders
    for l_start, l_dur in land:
        for w_start, w_dur in water:
            # Option 1: Do land ride first, then water ride
            land_end = l_start + l_dur
            water_actual_start = max(w_start, land_end)
            finish1 = water_actual_start + w_dur

            # Option 2: Do water ride first, then land ride
            water_end = w_start + w_dur
            land_actual_start = max(l_start, water_end)
            finish2 = land_actual_start + l_dur

            min_finish = min(min_finish, finish1, finish2)
    return min_finish
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L × W), where L is the number of land rides and W is the number of water rides; we check each pair in both orders.
- **Space Complexity:** O(1) extra space; only variables for tracking min_finish and loop iteration.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are many types of rides (land, water, air...) and you must visit each type in any order?
  *Hint: Generalize to k types; consider permutations and use DP or greedy approaches.*

- What if you can visit any number of rides (more than one from each type)?
  *Hint: Variations on scheduling, possibly interval merging or queue simulation.*

- Can you efficiently handle larger input sizes?  
  *Hint: See if any preprocessing (like sorting) or greedy choice applies when ride times don't overlap, or if parallel execution is allowed.*

### Summary
This problem is a classic **scheduling & simulation** pattern where you have to pick the earliest possible completion time considering constraints on start times and sequential dependencies. The solution involves **trying all pairs** and both orders, using simple math (max for start, + for finish). This can generalize to scheduling tasks with dependencies, such as meeting rooms, job sequencing, or bus/train transit problems.