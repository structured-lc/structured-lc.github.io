### Leetcode 2528 (Hard): Maximize the Minimum Powered City [Practice](https://leetcode.com/problems/maximize-the-minimum-powered-city)

### Description  
Given an array **stations** where stations[i] is the number of power stations in the iᵗʰ city, and an integer **r** indicating the range each power station can supply (to itself and r cities to the left and right, as long as those indices exist), determine the **maximum minimum power** you can guarantee for every city after placing up to **k** new power stations anywhere (multiple can be added per city).  
**Power of a city** = total number of stations within its range (including its own and those of neighboring cities within distance r).  
Your goal: **Maximize** the smallest power value across all cities by distributing k additional stations optimally.

### Examples  

**Example 1:**  
Input: `stations = [1,2,4,5,0], r = 1, k = 2`  
Output: `5`  
*Explanation: Adding both new stations to the last city gives stations = [1,2,4,5,2].  
Range 1, so city powers after adding: [3,7,11,9,7].  
Minimum = 3 → not optimal.  
Instead, place one in the last city and one in the second-last: [1,2,4,6,1] → powers: [3,7,12,11,7].  
Minimum = 3.  
But the optimal is both stations at city 2: [1,2,6,5,0].  
Powers: [3,9,13,11,9].  
Minimum of all possibilities is 5. Best possible minimum = 5.*

**Example 2:**  
Input: `stations = [4,4,4,4], r = 1, k = 0`  
Output: `8`  
*Explanation: No additional stations to be placed.  
Each city has itself and two neighbors: power for cities 1 and 2 = 4 + 4 + 4 = 12, cities 0 and 3 = 8.  
So minimum = 8.*

**Example 3:**  
Input: `stations = [0,0,0,0], r = 0, k = 4`  
Output: `1`  
*Explanation: Need to put 4 stations.  
Must put 1 in each city to have minimum power at least 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** For each possible way to place the k stations among n cities, compute resulting minimum power. TLE for large n and k.
- **Optimization:**  
  - Notice we can ask: For a given minimum power “x”, is it possible to place up to k new stations so every city gets at least x power?  
  - This check can be performed greedily moving left to right—if a city doesn’t reach x, add more stations as far right (within its range) as possible to maximize reach.  
  - This pattern matches a **binary search on answer**:  
    - Left = min(stations),  
    - Right = sum(stations) + k + 1 (upper bound)  
    - For mid = (left+right)//2, check feasibility (as above); adjust accordingly.
- **Why is this fast?** Greedy approach ensures we never waste a new station, and binary search scores us O(log(answer) × n) instead of O(n^k).
- **Trade-offs:** Slight overhead to copy arrays or maintain diff arrays for range updates, but complexity is manageable.

### Corner cases to consider  
- k = 0 (no stations can be built)  
- All zeros in stations  
- r = 0 (each city's power = its own station count)  
- r large enough that every power station affects all cities  
- k ≥ n\*target (can always get any value ≤ total possible stations)  
- stations already all equal  
- Placing all new stations at one location vs spread out  
- Input of length 1

### Solution

```python
def maxPower(stations, r, k):
    n = len(stations)
    
    # Binary search for the answer
    left = min(stations)
    right = sum(stations) + k + 1  # safe upper bound

    # Helper: O(n) check if every city can reach 'minPower' with ≤k new stations
    def canReach(minPower):
        # Sliding window of current total power, using range add with diff array
        added = [0] * n
        current_add = 0
        window_sum = sum(stations[i] for i in range(min(r+1, n)))
        remain = k

        for i in range(n):
            # Update window_sum to the power at city i
            if i > 0:
                # next rightmost window cell enters, left one leaves
                if i + r < n:
                    window_sum += stations[i + r]
                    window_sum += added[i + r]
                if i - r - 1 >= 0:
                    window_sum -= stations[i - r - 1]
                    window_sum -= added[i - r - 1]

            # If window_sum too small, need to add more stations
            if window_sum < minPower:
                need = minPower - window_sum
                if need > remain:
                    return False
                pos = min(n - 1, i + r)
                added[pos] += need
                window_sum += need
                remain -= need

        return True

    # Binary search
    while left < right:
        mid = (left + right) // 2
        if canReach(mid):
            left = mid + 1
        else:
            right = mid

    return left - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(maxPower))  
  For each guess (binary search step), we do an O(n) sweep. MaxPower isn’t enormous—bounded by sum(stations)+k—so this is fast for n ≤ 10⁵.
- **Space Complexity:** O(n)  
  Extra array for added stations per check.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we must also report the exact placement for the new stations?  
  *Hint: Record “added” positions during feasibility checks.*

- How would constraints change if stations could not be stacked (only 1 per city)?  
  *Hint: Would require more combinatorial or greedy adjustments.*

- Can we preprocess to support many such queries (different ks)?  
  *Hint: Consider persistent segment trees or prefix sums for batch queries.*

### Summary
This is a **Binary Search on Answer** combined with a greedy sweep (range covering, window updates).  
This pattern is widely used for “maximize the minimum” style allocation, interval/coverage, load balancing, and “can we reach X with ≤Y additions” network/resource planning problems.  
Typical features: test function simulates (greedily) and steers the binary search—common in scheduling, resource distribution, and “painter’s partition” family of problems.


### Flashcard
Binary search the minimum power x; for each x, greedily place stations to cover all cities, checking if ≤ k stations suffice.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Queue(#queue), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Number of Tasks You Can Assign(maximum-number-of-tasks-you-can-assign) (Hard)