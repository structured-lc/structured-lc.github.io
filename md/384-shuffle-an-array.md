### Leetcode 384 (Medium): Shuffle an Array [Practice](https://leetcode.com/problems/shuffle-an-array)

### Description  
Given an integer array, design a system that can:
- Randomly **shuffle** the array so every possible permutation is equally likely.
- **Reset** the array back to its original configuration at any time.

You need to implement a Solution class:
- Solution(nums): Initializes the object with the integer array `nums`.
- reset(): Resets and returns the array to its original state.
- shuffle(): Returns a random permutation (shuffle) of the array.

All permutations must have completely equal probability.

### Examples  

**Example 1:**  
Input: `["Solution", "shuffle", "reset", "shuffle"]`, `[[[1,2,3]],[],[],[]]`  
Output: `[null, [3,1,2], [1,2,3], [1,3,2]]`  
*Explanation:*
- Init: [1,2,3]
- `shuffle()` may return [3,1,2] (or any permutation)
- `reset()` returns [1,2,3]
- another `shuffle()` may return [1,3,2] (or any permutation)

**Example 2:**  
Input: `["Solution", "reset", "shuffle"]`, `[[[1]], [], []]`  
Output: `[null, [1], [1]]`  
*Explanation:*
- Only one element: `[1]`. Shuffle has only one possible result.

**Example 3:**  
Input: `["Solution", "shuffle", "shuffle", "reset"]`, `[[[4,5,6]], [], [], []]`  
Output: `[null, [5,4,6], [4,6,5], [4,5,6]]`  
*Explanation:*
- Multiple shuffles yield random results. Reset always brings back the starting order.

### Thought Process (as if you’re the interviewee)  

First, the **brute-force** idea:  
- For shuffle, generate every permutation and pick one at random.  
- But with n elements, there are n! permutations, which can't be generated for large n (up to 50), so this isn't feasible.

We need an efficient and fair way to generate a random permutation:
- A proven algorithm for uniform shuffling is the **Fisher-Yates Shuffle** (a.k.a. Knuth Shuffle).
- The algorithm walks from the start to the end of the array. At each position i, pick a random index between i and the end, and swap those two.  
- This guarantees every permutation is equally likely, with O(n) time and O(1) extra space.

We also need to support **reset**:  
- The class must remember the _original_ array, so it can always return to it.
- This means keeping a reference or a copy that isn't mutated when shuffling.

Trade-offs:  
- Fisher-Yates is optimal here.  
- No extra libraries needed.
- Reset is O(n) for copy.

### Corner cases to consider  
- Empty array (`[]`)
- Array with only one element (`[1]`)
- Arrays with all distinct elements (`[1,2,3]`)
- Large array (e.g. 50 elements)
- Ensure shuffle does not return only the original array repeatedly

### Solution

```python
import random

class Solution:
    def __init__(self, nums):
        # Store the original array for resetting.
        self.original = nums[:]
        self.nums = nums[:]

    def reset(self):
        # Restore to original array.
        self.nums = self.original[:]
        return self.nums

    def shuffle(self):
        array = self.nums[:]
        n = len(array)
        # Fisher-Yates Shuffle
        for i in range(n):
            # Pick random index from i to n-1
            j = random.randint(i, n-1)
            # Swap
            array[i], array[j] = array[j], array[i]
        return array
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for each shuffle or reset call, since both (copy and swap loop) must traverse the whole array.
- **Space Complexity:** O(n) for storing both the original and current array (needed for reset), and for copy operations.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you shuffle a large array in-place, if you must do so without extra array copy?
  *Hint: Can you keep track of modifications, or avoid extra allocations?*

- How can you test that your shuffle is unbiased?
  *Hint: Run the shuffle many times and count the frequency of each possible outcome.*

- Can you implement the same design for linked lists or streaming data?
  *Hint: Think about access patterns and if you can index randomly or not.*

### Summary

This problem is a classic use of the **Fisher-Yates Shuffle** algorithm—the gold standard for unbiased, efficient array shuffling. The coding pattern involves storing an original reference for reset functionality, and mutating (shuffling) a working copy for the shuffle method. This design commonly appears in randomized algorithms, card shuffling simulators, and puzzles.

### Tags
Array(#array), Math(#math), Design(#design), Randomized(#randomized)

### Similar Problems
