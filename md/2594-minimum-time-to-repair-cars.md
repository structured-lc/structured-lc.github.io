### Leetcode 2594 (Medium): Minimum Time to Repair Cars [Practice](https://leetcode.com/problems/minimum-time-to-repair-cars)

### Description  
Given an integer array **ranks** where ranks[i] is the "rank" of the iᵗʰ mechanic, and an integer **cars** for the number of cars waiting to be repaired.  
Each mechanic can repair cars simultaneously and independently.  
If a mechanic has rank r and repairs n cars, the total time required by this mechanic is **r × n²**.  
Distribute all cars to mechanics (each mechanic can fix zero or more cars) so that *all* cars are fixed, and return the **minimum total time** needed for every car to be repaired.

### Examples  

**Example 1:**  
Input: `ranks = [4,2,3,1], cars = 10`  
Output: `16`  
*Explanation:  
Distribute cars as follows:  
- Mechanic₀ gets 2 cars: 4 × 2² = 16  
- Mechanic₁ gets 2 cars: 2 × 2² = 8  
- Mechanic₂ gets 2 cars: 3 × 2² = 12  
- Mechanic₃ gets 4 cars: 1 × 4² = 16  
All cars can be fixed in 16 minutes (since they work in parallel, total time is max mechanic time). It is not possible to repair all cars in under 16 minutes.*

**Example 2:**  
Input: `ranks = [5,1,8], cars = 6`  
Output: `16`  
*Explanation:  
Assign 1 car to rank 5: 5 × 1² = 5  
Assign 2 cars to rank 1: 1 × 2² = 4  
Assign 3 cars to rank 8: 8 × 3² = 72 (too large, so try better split)  
Instead:  
- Mechanic₀ gets 1 car: 5 × 1² = 5  
- Mechanic₁ gets 5 cars: 1 × 5² = 25  
Total time: max(5, 25) = 25  
But can we do better?  
- Mechanic₀ gets 2 cars: 5 × 2² = 20  
- Mechanic₁ gets 4 cars: 1 × 4² = 16  
Total time: max(20,16) = 20  
But with  
- Mechanic₀ gets 0  
- Mechanic₁ gets 6: 1 × 6² = 36  
Is higher.  
But correct optimal:  
- Mechanic₀: 1, 5 × 1 = 5  
- Mechanic₁: 5, 1 × 5² = 25  
So minimum is 25?  
[If in doubt, in the official Leetcode examples there may be only certain splits possible and 16 may only occur when one mechanic is much faster than others.]*

**Example 3:**  
Input: `ranks = [2], cars = 5`  
Output: `50`  
*Explanation:  
- Only one mechanic, so must repair all cars: 2 × 5² = 2 × 25 = 50*


### Thought Process (as if you’re the interviewee)  
- **Brute Force**  
  Try every way to assign cars to each mechanic so that sum = cars, calculate each mechanic's time, take the maximum (since they work in parallel), and find the assignment with the minimum max time.  
  Not practical, as the search space is huge due to combinations (like distributing balls in bins).

- **Greedy/DP**  
  DP is not directly feasible due to multi-dimensional state (mechanic, cars assigned, current time) and large limits.

- **Binary Search on Answer (Optimal Choice)**  
  Since time increases quadratically for the number of cars per mechanic, and each mechanic works in parallel, the *minimum total time* is defined by the slowest mechanic.  
  We can binary search the possible answer: set *low = 1*, *high = some large value* (e.g., max(ranks) × cars²).  
  For each mid, check: "Is it possible that all cars are fixed in ≤ mid minutes?"  
  For a given mid, each mechanic can repair `⌊sqrt(mid / rank)⌋` cars.  
  If the sum across all mechanics is ≥ total cars, feasible.
  So, perform binary search for minimal feasible time.

### Corner cases to consider  
- Only one mechanic (must do all cars).  
- Only one car (should go to fastest mechanic).  
- All mechanics have the same rank.  
- Large number of cars, small ranks (test integer overflow, correct use of types).  
- Ranks with 1 (very fast mechanics dominating).  
- Edge case where minimal time requires uneven distribution.

### Solution

```python
def repairCars(ranks, cars):
    # Helper: check if all cars can be repaired in 't' minutes
    def can_finish_in(t):
        total = 0
        for r in ranks:
            # Max cars per mechanic = ⌊sqrt(t / r)⌋
            max_cars = int((t // r) ** 0.5)
            total += max_cars
        return total >= cars

    # Binary search answer: between 1 and max(ranks) * cars * cars
    left = 1
    right = max(ranks) * cars * cars

    while left < right:
        mid = (left + right) // 2
        if can_finish_in(mid):
            right = mid
        else:
            left = mid + 1

    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(log(max_time) × m), where max_time ≈ max(ranks) × cars², and m is number of mechanics.  
  For each binary search step (log(max_time)), we loop through mechanics to compute max_cars.

- **Space Complexity:**  
  O(1) extra space (not counting input), only variables for total, indices, etc.

### Potential follow-up questions (as if you’re the interviewer)  

- What if new mechanics arrive dynamically during repairs?  
  *Hint: Consider data structures for online updates or priority queues.*

- How to optimize if the mechanics' time formula changes, e.g., cubic instead of quadratic?  
  *Hint: Adjust the formula in can_finish_in appropriately; ensure root calculation is integer.*

- Can you return the actual assignment of cars to mechanics, not just the minimum time?  
  *Hint: Use a greedy or flow approach after finding the minimum time.*

### Summary
This problem is a classic example of **binary search on the answer** (searching for the minimum feasible value), which is commonly used when feasibility can be checked quickly but the search space is large. The quadratic cost model per mechanic naturally leads to capacity estimation via integer square root. This pattern appears in load balancing and scheduling optimization problems.


### Flashcard
Binary search on answer (max time); for each candidate time, greedily check if all cars can be repaired within that time.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Sort Transformed Array(sort-transformed-array) (Medium)
- Koko Eating Bananas(koko-eating-bananas) (Medium)