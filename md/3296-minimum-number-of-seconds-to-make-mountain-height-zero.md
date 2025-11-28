### Leetcode 3296 (Medium): Minimum Number of Seconds to Make Mountain Height Zero [Practice](https://leetcode.com/problems/minimum-number-of-seconds-to-make-mountain-height-zero)

### Description  
Given a mountain of height `h` and an array workerTimes[] of length n (workerTimes[i] is the time for the iᵗʰ worker to reduce the height by 1), find the minimum number of seconds needed to reduce the mountain’s height to zero.  
- Each second, each worker can decrease the height by 1, but the time needed increases for each subsequent unit they reduce: the first reduction by worker i takes workerTimes[i], the second takes workerTimes[i] × 2, the third takes workerTimes[i] × 3, etc.
- All workers can work in parallel.
- The goal is to compute the minimum total seconds for any allocation of reductions among workers.

### Examples  

**Example 1:**  
Input: `mountainHeight = 3, workerTimes = [2,3,1]`  
Output: `3`  
*Explanation: Assign worker 2 (time=1) to do all 3 units:  
- Reduces by 1: 1  
- Reduces by 2: 1×2=2  
- Reduces by 3: 1×3=3  
Total for worker 2 to do all: 1+2+3=6  
But if split:  
- Worker 2 does 2 units (1+2=3)  
- Worker 0 does 1 unit (2)  
In parallel, minimum max time is 3.*

**Example 2:**  
Input: `mountainHeight = 4, workerTimes = [4,2]`  
Output: `6`  
*Explanation:  
Try worker 0 does 1, worker 1 does 3:  
- Worker 0: 4  
- Worker 1: 2+4+6=12  
Max=12 (too large).  
Split evenly: both do 2 units each:  
- Worker 0: 4+8=12  
- Worker 1: 2+4=6  
Max=12.  
Better to let worker 1 do as much as possible. So min time is 6.*

**Example 3:**  
Input: `mountainHeight = 5, workerTimes = [3]`  
Output: `15`  
*Explanation: One worker must do all: 3+6+9+12+15 = 45. But since each action is sequential, the total time needed is 15 (wait per reduction, not sum).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try every way of distributing the height reductions among workers, and for each, calculate the cost. For each worker, time = workerTimes[i] × (1 + 2 + ... + k) for k units. Take maximum time among all workers. Return the minimum possible.
- **Why not feasible?** Distribution is exponential.
- **Optimization:**  
  - Since workers operate in parallel, the total time is dictated by the one who finishes last.
  - For a fixed *candidate* total time t, can we assign units so that the job is done within t? Use binary search for t.
  - For a worker with time u, how many units can they do in t? For unit k, time cost is u × (1 + 2 + ... + k) = u × k(k+1)/2 ≤ t ⇒ k(k+1)/2 ≤ t/u.  
    Solve for k: k = ⌊√(2×t/u + 1/4) - 0.5⌋.
  - For all workers, sum up their maximum possible allocations. Can the total cover the mountain height?  
  - Minimum t where sum_k >= mountainHeight is the answer.

- **Trade-offs:**  
  - This approach is efficient because it uses binary search and simple math per worker.

### Corner cases to consider  
- mountainHeight = 0 (no work needed).
- workerTimes has only 1 worker.
- All workerTimes are the same.
- Large mountainHeight or large workerTimes values (overflow).
- One very slow worker among fast ones.

### Solution

```python
def minimumSecondsToZero(mountainHeight, workerTimes):
    # Helper function: in time t, how many total reductions can all workers do?
    def total_reductions_within_time(t):
        total = 0
        for wt in workerTimes:
            # Quadratic formula solution for k(k+1)/2 * wt <= t
            if t < wt:
                continue
            # k(k+1)/2 * wt <= t  =>  k^2 + k - 2t/wt <= 0
            # Use k = floor(sqrt(2*t/wt + 0.25) - 0.5)
            x = 2 * t // wt + 1  # Integer safe for large t
            k = int((x ** 0.5) - 0.5)
            total += k
        return total

    if mountainHeight == 0:
        return 0

    left, right = 1, 10**18  # Pick large upper bound
    answer = right

    while left <= right:
        mid = (left + right) // 2
        if total_reductions_within_time(mid) >= mountainHeight:
            answer = mid
            right = mid - 1  # Try smaller time
        else:
            left = mid + 1

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(ans)), where n = len(workerTimes), log(ans) ~60 since t can be up to 10¹⁸. For each binary search step, check needs O(n).
- **Space Complexity:** O(1), outside input storage. No extra data structures apart from variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could assign fractions of reductions (split units of height among workers)?
  *Hint: Does the discrete cost logic change if reductions are continuous?*

- Can you solve the problem if workers’ work speeds or work times change each hour?
  *Hint: How would time-varying rates be handled?*

- How would you design this function for real-time updates when new workers can appear dynamically?
  *Hint: What data structure maintains the best assignment if workforce changes?*

### Summary
This problem uses **binary search on the answer** combined with a math formula (quadratic root) to quickly assign maximal workload to each worker within a time window. The pattern applies broadly to problems where work can be split among agents with increasing or non-uniform cost per unit, and is common in **scheduling, parallel processing load balancing, and capacity planning**.


### Flashcard
Binary search on the answer (total time t); for each candidate t, check if all workers can collectively reduce the mountain to zero height within time t using a greedy distribution.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Greedy(#greedy), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
