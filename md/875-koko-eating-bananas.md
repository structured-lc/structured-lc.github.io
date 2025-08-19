### Leetcode 875 (Medium): Koko Eating Bananas [Practice](https://leetcode.com/problems/koko-eating-bananas)

### Description  
You are given an array of integers representing the sizes of banana piles, and an integer **h** representing the total number of hours available. Each hour, Koko can eat up to **k** bananas from a single pile. If the pile contains fewer than **k** bananas, she eats the whole pile. She cannot eat from more than one pile per hour. Your goal is to find the **minimum eating speed** \(k\) (bananas per hour) so that Koko can finish all the piles within **h** hours.

### Examples  

**Example 1:**  
Input: `piles = [3,6,7,11]`, `h = 8`  
Output: `4`  
*Explanation:*
- Eating speed \(k=4\):
  - 3 bananas: 1 hour  
  - 6 bananas: ⌈6/4⌉ = 2 hours  
  - 7 bananas: ⌈7/4⌉ = 2 hours  
  - 11 bananas: ⌈11/4⌉ = 3 hours  
  - Total: 1 + 2 + 2 + 3 = 8 hours

**Example 2:**  
Input: `piles = [30,11,23,4,20]`, `h = 5`  
Output: `30`  
*Explanation:*
- Only possible if Koko eats at rate \(k=30\):
  - Each pile takes 1 hour (since every pile has \(\leq k\)): 1 + 1 + 1 + 1 + 1 = 5 hours

**Example 3:**  
Input: `piles = [30,11,23,4,20]`, `h = 6`  
Output: `23`  
*Explanation:*
- Try \(k=23\):
  - 30: ⌈30/23⌉ = 2
  - 11: 1
  - 23: 1
  - 4: 1
  - 20: 1
  - Total: 2 + 1 + 1 + 1 + 1 = 6 hours

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**:  
  Check every value of \(k\) from 1 to max(piles). For each, calculate total hours spent. Return the lowest \(k\) where total hours \(\leq h\).  
  *Inefficient — can be up to \(10^9\) iterations for large piles.*

- **Optimization — Binary Search**:
  - The function "hours needed at speed \(k\)" is *monotonically decreasing* — higher \(k\) always means fewer or equal hours.
  - Perform binary search on \(k\):  
    - **Left:** 1  
    - **Right:** max(piles) (since, at most, Koko must eat whole biggest pile in 1 hour)
    - For each mid-value, simulate and check if Koko can finish in \(\leq h\) hours.
    - Shrink search space accordingly.
  - This finds the minimum viable eating rate efficiently.

- **Why binary search?**  
  This is an application of searching for the minimum feasible rate within a bounded monotonic search space. O(N log M) where N is number of piles, M is max pile size.

### Corner cases to consider  
- Only one pile, h=1 ⇒ return size of that pile.
- piles contains all 1's, h = len(piles) ⇒ return 1.
- h equals number of piles ⇒ must eat each pile in 1 hour, so k = max(piles).
- h extremely large ⇒ k = 1 always suffices.

### Solution

```python
def minEatingSpeed(piles, h):
    # Helper to calculate hours needed at eating speed k
    def hours_needed(k):
        hours = 0
        for pile in piles:
            # Each pile requires ⌈pile/k⌉ hours
            hours += (pile + k - 1) // k   # Equivalent to math.ceil(pile / k)
        return hours

    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        if hours_needed(mid) <= h:
            right = mid  # Try lower k
        else:
            left = mid + 1  # Need higher k
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N log M), where N = number of piles, M = max(piles).  
  Each binary search step calls hours_needed(), which is O(N); binary search runs up to log₂M times.

- **Space Complexity:**  
  O(1) beyond input storage — only uses a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if Koko could eat from more than one pile per hour?
  *Hint: What changes if the constraint "only one pile per hour" is lifted?*

- How would you handle very large input sizes (e.g., streaming piles)?
  *Hint: Can you improve upon the linear scan for hours_needed?*

- What if each pile required a cooldown (rest) after touching it?
  *Hint: Problem becomes scheduling with cooldowns.*

### Summary
The approach uses **binary search over the answer**, a classic pattern when the feasibility of a target (here, hours needed for eating speed \(k\)) is monotonic. This strategy is common for resource allocation, minimum/maximum threshold, or "smallest/largest value satisfying conditions" problems. Practical in bandwidth allocation, job scheduling, and throughput optimization problems.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Minimize Max Distance to Gas Station(minimize-max-distance-to-gas-station) (Hard)
- Maximum Candies Allocated to K Children(maximum-candies-allocated-to-k-children) (Medium)
- Minimized Maximum of Products Distributed to Any Store(minimized-maximum-of-products-distributed-to-any-store) (Medium)
- Frog Jump II(frog-jump-ii) (Medium)
- Minimum Time to Repair Cars(minimum-time-to-repair-cars) (Medium)