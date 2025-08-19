### Leetcode 1057 (Medium): Campus Bikes [Practice](https://leetcode.com/problems/campus-bikes)

### Description  
You are given the positions of workers and bikes on a 2D grid (as lists of coordinates).  
There are n workers and m bikes, with n ≤ m.  
Each worker must be assigned exactly one bike.  
The assignment must follow these rules:
- Assign the *closest* available bike to each worker, using **Manhattan distance**:  
  | x₁ - x₂ | + | y₁ - y₂ |
- If there are multiple pairs with the same shortest distance, assign based on **smallest worker index**.
- For further ties, use the **smallest bike index**.
- Output an array where output[i] is the index of the bike assigned to worker i.

### Examples  

**Example 1:**  
Input: `workers = [[0,0],[2,1]], bikes = [[1,2],[3,3],[2,0]]`  
Output: `[2,0]`  
*Explanation:*
- All worker-bike distances:
    - Worker 0: Bike 0 (3), Bike 1 (6), Bike 2 (2)
    - Worker 1: Bike 0 (2), Bike 1 (3), Bike 2 (1)
- Assign closest for Worker 0 (Bike 2, dist=2).
- Assign closest for Worker 1 (Bike 0, dist=2). (Bike 2 already taken.)

**Example 2:**  
Input: `workers = [[0,0]], bikes = [[1,1],[2,2],[2,1]]`  
Output: ``  
*Explanation:*
- Worker 0 distances: Bike 0 (2), Bike 1 (4), Bike 2 (3)
- Bike 0 is the closest, so Worker 0 gets Bike 0.

**Example 3:**  
Input: `workers = [[0,0],[1,1]], bikes = [[1,0],[2,2],[2,1],[0,2]]`  
Output: `[0,3]`  
*Explanation:*
- Worker 0: Bike 0 (1), Bike 1 (4), Bike 2 (3), Bike 3 (2)
- Worker 1: Bike 0 (1), Bike 1 (2), Bike 2 (1), Bike 3 (1)
- Worker 0 gets Bike 0 (dist=1).
- Worker 1 now considers remaining bikes; the smallest bike index at the shortest distance is Bike 3 (dist=1).

### Thought Process (as if you’re the interviewee)  
**Brute-force:**  
- For each worker, calculate the distance to every bike.
- For each assignment round, choose the smallest distance pair, assign, and remove bike from consideration.
- This is O(n × m × n) (since each round you rescan all possibilities).

**Optimize:**  
- Precompute all possible (worker, bike, distance) triplets: O(n × m).
- Sort these by (distance, worker_idx, bike_idx): O(n × m × log(n × m)).
- Walk through sorted list, greedily assigning if neither the worker nor the bike has been assigned yet.
- This guarantees that the closest and lowest-indexed assignments are always preferred.

**Trade-offs:**  
- This makes the matching greedy and prioritizes required tie-breakers efficiently.
- Time is dominated by the sorting step.

### Corner cases to consider  
- No workers or no bikes (input size zero).
- More bikes than workers.
- Multiple pairs with same Manhattan distance and tie-breakers.
- All workers/bikes at the same location.
- Distance values can be the same for multiple workers to multiple bikes.
- Max input sizes (n, m up to 1000).

### Solution

```python
def assignBikes(workers, bikes):
    # List to store all (distance, worker_idx, bike_idx) tuples
    pairs = []
    n = len(workers)
    m = len(bikes)
    
    # Build all worker-bike-distance combinations
    for i in range(n):
        for j in range(m):
            wx, wy = workers[i]
            bx, by = bikes[j]
            dist = abs(wx - bx) + abs(wy - by)  # Manhattan distance
            pairs.append((dist, i, j))
    
    # Sort by distance, then worker index, then bike index
    pairs.sort()
    
    # Arrays to mark if worker or bike is assigned
    worker_assigned = [False] * n
    bike_assigned = [False] * m
    result = [-1] * n  # Index of assigned bike for each worker
    assigned_count = 0
    
    # Greedily assign bikes in sorted order
    for dist, i, j in pairs:
        if not worker_assigned[i] and not bike_assigned[j]:
            worker_assigned[i] = True
            bike_assigned[j] = True
            result[i] = j
            assigned_count += 1
            if assigned_count == n:
                break
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × m × log(n × m)) — 
    - O(n × m) to build the list of pairs.
    - O(n × m × log(n × m)) to sort all pairs.
    - O(n × m) iteration, but ends early when all workers assigned.
- **Space Complexity:**  
  O(n × m) for storing all possible pairs and the assignment state arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n and m are both up to 10,000?  
  *Hint: Can you do better than O(n × m × log(n × m))? Try bucket sort since Manhattan distances are bounded.*

- How would you handle assignments if the number of workers could be larger than bikes?  
  *Hint: Think about partial assignments or returning unassigned workers.*

- If the tie-breaking rule changes, e.g., prioritize lowest bike index always, how would you adapt the assignment?  
  *Hint: Adjust sorting priority accordingly.*

### Summary
The approach uses **greedy assignment** based on a precomputed and sorted list of all possible worker-bike pairs, ordered by increasing distance and tie-breakers on indices.  
This matches the **minimum edge weight assignment** with stable tie-breaks, a pattern that appears in "assign n resources to m items based on preferences," and can be adapted for problems like "campus scooters," "best job-matching," or "closest facility allocation." Sorting tuples for greedy assignment with custom rules is a very common coding interview pattern.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Campus Bikes II(campus-bikes-ii) (Medium)