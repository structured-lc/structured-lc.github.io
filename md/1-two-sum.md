### Leetcode 1 (Easy): Two Sum [Practice](https://leetcode.com/problems/two-sum)

### Description  
You are given an array of integers called `nums` and an integer `target`.  
Your task is to find **two unique indices** such that the numbers at those indices in `nums` add up to `target`. Return the indices as a list. You can assume:
- There is **exactly one unique solution**.
- You **cannot use the same element twice** (i.e., can't use the same index twice).
The answer can be returned in any order.

### Examples  

**Example 1:**  
Input: `nums = [7, 2, 13, 11]`, `target = 9`  
Output: `[0, 1]`  
*Explanation: nums is 7 and nums[1] is 2; 7 + 2 = 9, so return [0,1].*

**Example 2:**  
Input: `nums = [7, 3, 5]`, `target = 8`  
Output: `[1, 2]`  
*Explanation: nums[1] is 3 and nums[2] is 5; 3 + 5 = 8.*

**Example 3:**  
Input: `nums = [3, 2, 4]`, `target = 6`  
Output: `[1, 2]`  
*Explanation: nums[1] is 2 and nums[2] is 4; 2 + 4 = 6.*

### Thought Process (as if you’re the interviewee)  

Start with the **brute-force** approach:  
- Try every possible pair of numbers in the array and check if their sum equals the target.  
- For each index i, check every index j>i.  
- This takes O(n²) time, which is fine for small arrays but inefficient as n grows.

**Optimize using a hash map:**  
- As you scan each number num, compute the complement: `target - num`.  
- Check if this complement has *already* been seen (using a hash map storing value→index).  
- If it has, return [index_of_complement, current_index].  
- Else, store the current number and its index in the hash map and continue.

**Trade-offs:**  
- Brute-force uses no extra space, but is slow (O(n²)).  
- The hash map (dictionary) uses O(n) space, but reduces time to O(n), which is much faster for large inputs.

### Corner cases to consider  
- Array with **two elements** only (smallest valid input)
- Array with **duplicate numbers** (e.g., [3, 3], target=6)
- Negative numbers
- Large and very small values
- No solution (but problem guarantees at least one solution)
- Same number can't be used twice (can't return [i, i])

### Solution

```python
def two_sum(nums, target):
    # Store value to index mapping
    num_to_index = {}  # maps number value → index

    for i, num in enumerate(nums):
        complement = target - num
        # Check if complement is already seen
        if complement in num_to_index:
            return [num_to_index[complement], i]  # Found the answer
        # Store number seen so far
        num_to_index[num] = i
    # If no solution found (the problem says this never happens)
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  Each number is visited only once; dictionary operations are O(1) on average.
- **Space Complexity:** O(n), for storing up to n elements in the hash map in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there may not be **exactly one solution**?  
  *Hint: Carefully handle cases with no result, or where multiple pairs exist.*

- Could you return the **actual numbers** (not indices)?  
  *Hint: Return `[num, complement]` instead of indices; algorithm logic is similar.*

- What if the **input array is sorted**?  
  *Hint: Consider the two-pointer technique for sorted arrays.*

### Summary  
The hash map approach demonstrates the **"One-pass Hash Table"** or **"Two-pointer (if sorted)"** patterns.  
This problem is a classic example of "find two numbers in an array that sum to a value" and this fast hash map approach is fundamental for a broad class of problems, including "Three Sum", "Four Sum", and various subarray problems.