### Leetcode 528 (Medium): Random Pick with Weight [Practice](https://leetcode.com/problems/random-pick-with-weight)

### Description  
You're given an array `w` where each element represents the **weight** of the corresponding index. Implement a class with a method `pickIndex()` that randomly picks an index in proportion to its weight. For example, an index with double the weight of another should be picked twice as often. The total number of times each index is picked, over many trials, should converge to the ratio of its weight to the total sum of all weights.

### Examples  

**Example 1:**  
Input: `["Solution", "pickIndex"] [[1,3], []]`  
Output: `[null,1]`  
*Explanation: The total weight is 4. Probability of picking index 0 = 1/4, index 1 = 3/4. So, index 1 is much more likely to be picked.*

**Example 2:**  
Input: `["Solution", "pickIndex", "pickIndex", "pickIndex"] [[1,2,3], [], [], []]`  
Output: `[null,2,1,0]`  
*Explanation: The total weight is 6. Index probabilities: 0 = 1/6, 1 = 2/6, 2 = 3/6. The outputs should reflect these probabilities over many trials.*

**Example 3:**  
Input: `["Solution", "pickIndex", "pickIndex", "pickIndex"] [[3,1], [], [], []]`  
Output: `[null,0,1,0]`  
*Explanation: Probability for index 0 = 3/4; index 1 = 1/4. Index 0 is expected to be picked more often.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For each call to `pickIndex()`, create a new array that repeats indices according to their weight. For example, `[1,3]` becomes `[0,1,1,1]`. Then randomly pick any element from this expanded array.  
  This works but is *clearly inefficient* (can use a huge amount of memory for large weights).

- **Optimized approach:**  
  Use the *prefix sum* (cumulative sum) approach:
  - Build a prefix sum array: each entry is the total weight up to that index.
  - Generate a random number `x` between 1 and total weight.
  - Use **binary search** to find the *smallest* index such that the prefix sum is ≥ `x`.
  - This maps the random number to the correct index by its weighted range.

- **Why does this work?**
  Each index occupies a "range" in the prefix sum proportional to its weight. Randomly picking within the total weight and finding where the random draw lands ensures each index is picked proportional to its weight.

- **Trade-offs:**  
  - Initialization is O(n) for prefix sum.
  - Each `pickIndex()` is O(log n) due to binary search.
  - Very efficient compared to any brute force or naive expansion of weights.

### Corner cases to consider  
- w has only one element (should always return 0).
- All weights are equal (should behave like uniform random).
- Very large weights (ensure prefix sums and random selection work for big numbers).
- Consecutive pickIndex calls (ensure randomness and no state leaking).
- Empty array: (per constraints, w always has at least 1 element).

### Solution

```python
import random

class Solution:
    def __init__(self, w):
        # Compute prefix sum array
        self.prefix_sum = []
        curr_sum = 0
        for weight in w:
            curr_sum += weight
            self.prefix_sum.append(curr_sum)
        self.total = curr_sum

    def pickIndex(self):
        # Pick random integer in [1, total weight]
        target = random.randint(1, self.total)
        # Binary search for the leftmost prefix_sum >= target
        left, right = 0, len(self.prefix_sum) - 1
        while left < right:
            mid = (left + right) // 2
            if self.prefix_sum[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Constructor: O(n) (for building the prefix sum array)
  - pickIndex(): O(log n) (for binary search over the prefix sum)

- **Space Complexity:**  
  - O(n), used by the prefix sum array.

### Potential follow-up questions (as if you’re the interviewer)  

- If pickIndex gets called millions of times, how could you further optimize either speed or memory?  
  *Hint: Is there any possible caching or different random generation approach that helps?*

- What if weights can be 0?  
  *Hint: Should zeros be filtered, or how does that affect the random selection?*

- What if the weights change frequently between picks?  
  *Hint: Would you update the prefix sum array dynamically, or do you need a different data structure?*

### Summary
This problem uses the **Prefix Sum + Binary Search** pattern for efficient weighted random sampling. The approach ensures O(n) setup and O(log n) per query, balancing time and space well for most applications. This design is commonly used in algorithms requiring non-uniform probability selection, such as weighted lottery systems, sharding based on load, or simulating biased dice.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Prefix Sum(#prefix-sum), Randomized(#randomized)

### Similar Problems
- Random Pick Index(random-pick-index) (Medium)
- Random Pick with Blacklist(random-pick-with-blacklist) (Hard)
- Random Point in Non-overlapping Rectangles(random-point-in-non-overlapping-rectangles) (Medium)