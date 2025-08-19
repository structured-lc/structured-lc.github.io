### Leetcode 398 (Medium): Random Pick Index [Practice](https://leetcode.com/problems/random-pick-index)

### Description  
Given an integer array `nums` that may contain duplicates, design a class that can randomly pick the index of a given target number. Each index where the target appears should have **equal probability** of being picked.  
You need to implement two operations:
- The constructor: stores the input array.
- The `pick(target)` method: returns a random index `i` such that `nums[i] == target`.  
If the target appears multiple times, each index must be equally likely to be returned.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 3, 3]`, `pick(3)`  
Output: `2`, `3`, or `4` (randomly)  
*Explanation: Indices 2, 3, and 4 all have the value 3. Each should be returned with a 1/3 chance.*

**Example 2:**  
Input: `nums = [1, 2, 3, 3, 3]`, `pick(1)`  
Output: `0`  
*Explanation: The only index with value 1 is 0, so that index is always returned.*

**Example 3:**  
Input: `nums = [1, 1, 1, 1]`, `pick(1)`  
Output: `0`, `1`, `2`, or `3`  
*Explanation: Each index 0, 1, 2, or 3 is equally likely (1/4) since they all have value 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each call to `pick(target)`, loop through the array, find all indices with value equal to the target, store them in a list, then return one random index from this list.
  - Time: O(n) per pick
  - Space: O(k) per pick (where k = count of target)
  - *Problem:* If we call pick many times, this is not efficient.

- **Preprocessing Map:**  
  On initialization, build a map from each value to a list of its indices. Now `pick(target)` is simply choosing a random index from `map[target]`.
  - Time: O(1) pick, O(n) init and space.
  - *Tradeoff:* Fast pick if memory is plentiful, but could use excess memory with many unique numbers.

- **Reservoir Sampling:**  
  To save space, use Reservoir Sampling during `pick(target)`:
  - Loop over `nums`, and for each occurrence of target, randomly keep its index with probability 1/k (k = count so far). At the end, return the kept index.
  - Time: O(n) per pick. Space: O(1) extra.
  - *Why?* Because it allows us to randomly choose among targets with a single pass and constant extra memory. Works even if nums is huge or pick is infrequent.

- **Final choice:**  
  Reservoir Sampling gives the best time-space tradeoff when we want low space and reasonable pick time, and is a textbook approach for this random selection among unknown frequency data.

### Corner cases to consider  
- Array has only one element.
- All elements are the same as the target.
- Target occurs only once in array.
- Target not present (should not happen as per constraints).
- Very large array with infrequent targets.

### Solution

```python
import random

class Solution:
    def __init__(self, nums):
        # Store the reference to the input array
        self.nums = nums

    def pick(self, target):
        # Reservoir sampling to ensure each index is equally likely
        count = 0
        chosen_index = -1
        for idx, num in enumerate(self.nums):
            if num == target:
                count += 1
                # With probability 1/count, choose the current index
                if random.randint(1, count) == 1:
                    chosen_index = idx
        return chosen_index
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n) per pick, where n = length of nums.  
    (Because for every pick, we scan the whole array and consider each element.)
- **Space Complexity:**  
  - O(1) extra (excludes the input array).  
    (We only store a few variables; we do not keep maps or indices of targets.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if `pick()` is called extremely frequently? Is there a way to make it O(1) per pick?  
  *Hint: Consider storing a dictionary from value to list of indices during __init__.*

- If the array is extremely large and cannot fit in memory, how would you handle this problem?  
  *Hint: You need a streaming solution—Reservoir Sampling is suitable here.*

- What if you want to pick *k* random indices (not just one) of the target?  
  *Hint: Use Reservoir Sampling with reservoir size k.*

### Summary
This problem is a classic use case for the **Reservoir Sampling** algorithm, which allows for random sampling over single-pass data with unknown size using constant space. The pattern appears in problems where you must randomly pick an occurrence from a set or stream, especially when pre-storage of all options is infeasible. Variants include picking k random elements or handling streaming data where only one pass is allowed.

### Tags
Hash Table(#hash-table), Math(#math), Reservoir Sampling(#reservoir-sampling), Randomized(#randomized)

### Similar Problems
- Linked List Random Node(linked-list-random-node) (Medium)
- Random Pick with Blacklist(random-pick-with-blacklist) (Hard)
- Random Pick with Weight(random-pick-with-weight) (Medium)