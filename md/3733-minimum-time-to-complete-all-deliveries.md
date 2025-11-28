# Leetcode 3733 (Medium): Minimum Time to Complete All Deliveries [Practice](https://leetcode.com/problems/minimum-time-to-complete-all-deliveries)

### Description

You are given two delivery drones with specific delivery quotas and recharge requirements. Each drone i must recharge every rᵢ hours (meaning it cannot deliver during its rᵢ-th hour). Given arrays d = [d₁, d₂] representing the number of deliveries each drone must complete and r = [r₁, r₂] representing their recharge intervals, find the minimum total time T (in hours) such that both drones can complete all their required deliveries within T hours, accounting for their recharge periods.


### Examples

**Example 1:**  
Input: `d = [1, 2], r = [3, 2]`  
Output: `3`  
*Explanation: In 3 hours, drone 1 can deliver 2 packages (hours 1 and 2, recharging at hour 3), and drone 2 can deliver 1 package (hour 1, recharging at hour 2, delivering again at hour 3). Together they complete all 3 deliveries.*

**Example 2:**  
Input: `d = [4, 4], r = [2, 3]`  
Output: `6`  
*Explanation: With period LCM(2,3) = 6, drone 1 can do 4 deliveries (hours 1, 3, 4, 5) and drone 2 can do 4 deliveries (hours 1, 2, 4, 5). The cycle repeats every 6 hours, allowing exactly 4 + 4 = 8 deliveries, which covers the required 8.*

**Example 3:**  
Input: `d = [2, 2], r = [5, 5]`  
Output: `5`  
*Explanation: Both drones recharge on hour 5 only. In 5 hours, each can complete 4 deliveries (hours 1, 2, 3, 4). Combined they can do 8 deliveries, which covers the required 4.*


### Thought Process (as if you're the interviewee)

The brute force approach would be to check every possible time value from 1 onwards until we find a time T where both drones can complete their deliveries. For each time T, we'd calculate how many deliveries each drone can complete.

To optimize, I observe that as time increases, the number of deliveries both drones can complete is monotonically increasing. This makes it a perfect candidate for **binary search on the answer**.

For a given time T, I need to check if both drones can complete their required deliveries:
1. Calculate deliveries each drone can do in time T (accounting for recharge periods)
2. The key insight is that within time T, a drone recharges on hours r, 2r, 3r, etc.
3. So drone i can deliver on ⌊T/rᵢ⌋ hours, but some of those hours overlap with both drones' recharge times
4. I need to calculate total available delivery slots considering the recharge schedules

The binary search range: minimum is 1, maximum is around 2 × 10⁹ (worst case where both drones have large recharge periods and large delivery counts).

For the feasibility check, I calculate:
- Deliveries by drone 1 alone: ⌊T/r₁⌋
- Deliveries by drone 2 alone: ⌊T/r₂⌋
- Deliveries possible in overlapping available slots: ⌊T/LCM(r₁, r₂)⌋
- Total available: (⌊T/r₁⌋ - ⌊T/LCM(r₁, r₂)⌋) + (⌊T/r₂⌋ - ⌊T/LCM(r₁, r₂)⌋) + ⌊T/LCM(r₁, r₂)⌋

This must be ≥ d₁ + d₂.


### Corner cases to consider

- Both drones have the same recharge interval
- One drone has a much larger recharge interval than the other
- Very large delivery counts requiring long time periods
- d₁ = 0 or d₂ = 0 (one drone doesn't need deliveries)
- r₁ and r₂ are coprime (LCM = r₁ × r₂)
- Time T is exactly at a recharge boundary


### Solution

```python
def minimumTime(d, r):
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a
    
    def lcm(a, b):
        return (a * b) // gcd(a, b)
    
    def canComplete(t):
        # Calculate deliveries for drone 1
        drone1_deliveries = t // r[0]
        
        # Calculate deliveries for drone 2
        drone2_deliveries = t // r[1]
        
        # Calculate overlapping recharge period
        lcm_val = lcm(r[0], r[1])
        overlap_slots = t // lcm_val
        
        # Total available slots considering both can share time
        # Each drone gets exclusive time, plus they share the overlap
        delta1 = drone1_deliveries - overlap_slots
        delta2 = drone2_deliveries - overlap_slots
        
        # Remaining deliveries after each drone uses exclusive slots
        remaining_d1 = max(0, d[0] - delta1)
        remaining_d2 = max(0, d[1] - delta2)
        
        # Check if shared slots can cover remaining deliveries
        total_remaining = remaining_d1 + remaining_d2
        
        return total_remaining <= overlap_slots
    
    # Binary search for minimum time
    left, right = 1, 2 * 10**9
    
    while left < right:
        mid = (left + right) // 2
        if canComplete(mid):
            right = mid
        else:
            left = mid + 1
    
    return left
```

### Time and Space complexity Analysis

- **Time Complexity:** O(log(max_time) × log(max(r₁, r₂))) = O(log(2 × 10⁹) × log(10⁹)) ≈ O(30 × 30) = O(1) effectively. The binary search runs O(log(2 × 10⁹)) iterations. Each iteration calls canComplete which involves GCD calculation taking O(log(max(r₁, r₂))) time.

- **Space Complexity:** O(1). We only use a constant amount of extra space for variables like left, right, mid, and the GCD/LCM calculations don't require additional data structures.


### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if there were 3 or more drones instead of 2? How would your approach change?*  
  *Hint: Consider using LCM of all recharge periods and think about how to distribute remaining deliveries among multiple drones.*

- (Follow-up question 2)  
  *What if drones could have different recharge costs or energy levels? How would that affect the calculation?*  
  *Hint: You'd need to track energy state per drone and account for variable recharge times or durations.*

- (Follow-up question 3)  
  *Can you optimize the GCD calculation for very large recharge periods?*  
  *Hint: Euclidean algorithm is already optimal for GCD, but you could precompute LCM if this function is called repeatedly.*


### Summary

This problem uses **binary search on the answer** combined with **mathematical calculations** involving GCD/LCM. The key insight is recognizing that the feasibility of completing deliveries within time T is monotonic—if it's possible in T hours, it's possible in T+1 hours. By calculating how many delivery slots each drone has (accounting for recharge periods), we can determine if the required deliveries can be completed.

This pattern appears frequently in optimization problems where we need to find a minimum value satisfying certain constraints. Similar patterns are used in problems like "Minimum Time to Complete Trips" and "Capacity to Ship Packages Within D Days," where binary search helps find optimal thresholds.


### Flashcard
Use binary search on time T; for each T, greedily check if both drones can complete their deliveries by calculating maximum deliveries each can handle.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
