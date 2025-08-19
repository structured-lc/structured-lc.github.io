### Leetcode 774 (Hard): Minimize Max Distance to Gas Station [Practice](https://leetcode.com/problems/minimize-max-distance-to-gas-station)

### Description  
Given a sorted array of positions of existing gas stations along a road (as distinct integers), and an integer k—the number of additional gas stations you can add—place the new stations anywhere (including fractions between existing stations) such that *after adding all k stations, the largest distance between any two adjacent stations is minimized*. Return this minimal possible value with at most six decimal digits.

### Examples  

**Example 1:**  
Input: `stations = [1, 7], k = 1`  
Output: `3.00000`  
*Explanation: Adding 1 station at position 4 splits the interval into [1,4,7]. The distances are [3,3], so the largest is 3.0.*

**Example 2:**  
Input: `stations = [1, 7], k = 2`  
Output: `2.00000`  
*Explanation: Adding stations at 3 and 5 creates [1,3,5,7]. All intervals are length 2, so 2.0 is the minimal possible maximum distance.*

**Example 3:**  
Input: `stations = [0, 10], k = 2`  
Output: `3.33333`  
*Explanation: Add at ≈3.333 and ≈6.666, yielding lengths ≈3.333 between each pair: [0,3.333,6.666,10]. Maximum is ≈3.333.*

### Thought Process (as if you’re the interviewee)  
A brute-force way would be to try inserting k stations at every possible location, evaluating all possible combinations. This quickly becomes intractable.

Instead, let’s reframe:  
- The *penalty* (max distance between any pair of adjacent stations) can be minimized by placing new stations to evenly split the largest existing intervals.
- Rather than brute-forcing every possible new station position, **we can binary search on the possible values of the penalty**.
    - For a given penalty value `d`, can we split every existing interval with at most k extra stations so that no interval is larger than `d`?
    - For interval `length`, it takes ⌈length / d⌉ - 1 stations to achieve segments ≤ d.
- If it’s possible to do this with k or fewer stations, try a smaller penalty. Otherwise, try larger.
- The search range is from `0` to the maximum initial interval in `stations`.

We perform binary search until the difference between low and high is sufficiently small (1e-6). The answer is then low (or high).

### Corner cases to consider  
- Only one gas station (no intervals)
- k = 0 (no stations can be added)
- All stations very close (already optimal)
- Large k (can fill every large interval to make all segments almost equal)
- Multiple intervals of unequal length

### Solution

```python
def minmaxGasDist(stations, k):
    # Helper function: for a given penalty 'd', compute # of needed stations
    def stations_needed(d):
        count = 0
        for i in range(len(stations) - 1):
            interval = stations[i+1] - stations[i]
            # Need to cut interval into parts ≤ d; each cut adds a station
            count += int((interval / d - 1e-9))  # minor bias to avoid floating error
        return count

    # Binary search for minimal max distance
    lo, hi = 0.0, max(stations[i+1] - stations[i] for i in range(len(stations)-1))
    precision = 1e-6

    while hi - lo > precision:
        mid = (lo + hi) / 2
        if stations_needed(mid) > k:
            lo = mid
        else:
            hi = mid
    return hi
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log((max interval) / precision)),  
  where n = number of stations and precision is 1e-6. Each binary search step (log factor) checks all n-1 intervals.
- **Space Complexity:** O(1) extra space (just a few variables).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we can only add stations at integer positions?
  *Hint: Does the binary search still work? Would any change be needed?*

- How would the algorithm change if all new stations had to be placed between different station pairs?
  *Hint: Do you need to precompute possible pairs and assign stations optimally?*

- Can you reduce the complexity further if k is much smaller than n?
  *Hint: Is there a greedy way, e.g. always split the largest segment?*

### Summary  
This problem is a classic application of **binary search on the answer**: we use binary search to find the smallest max distance (penalty) such that placing k new gas stations achieves it. The approach is efficient and avoids the combinatorial explosion of placing each individual station, and applies generally to problems where you need to minimize the maximum across subdivided intervals. This pattern appears in load balancing, job scheduling, and array partitioning problems.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Koko Eating Bananas(koko-eating-bananas) (Medium)