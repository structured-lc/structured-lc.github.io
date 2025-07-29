### Leetcode 1920 (Easy): Build Array from Permutation [Practice](https://leetcode.com/problems/build-array-from-permutation)

### Description  
Given an array `nums` that contains a permutation of the integers from 0 to n-1 (no duplicates, n = nums.length), build a new array `ans` of the same length such that for every index i, `ans[i] = nums[nums[i]]`. That is, for each i, use the value at nums[i] as an index into nums and set ans[i] to that value. Return the resulting array.

### Examples  

**Example 1:**  
Input: `nums = [0,2,1,5,3,4]`  
Output: `[0,1,2,4,5,3]`  
*Explanation:  
ans = nums[nums] = nums = 0  
ans[1] = nums[nums[1]] = nums[2] = 1  
ans[2] = nums[nums[2]] = nums[1] = 2  
ans[3] = nums[nums[3]] = nums[5] = 4  
ans[4] = nums[nums[4]] = nums[3] = 5  
ans[5] = nums[nums[5]] = nums[4] = 3*

**Example 2:**  
Input: `nums = [5,0,1,2,3,4]`  
Output: `[4,5,0,1,2,3]`  
*Explanation:  
ans = nums[nums] = nums[5] = 4  
ans[1] = nums[nums[1]] = nums = 5  
ans[2] = nums[nums[2]] = nums[1] = 0  
ans[3] = nums[nums[3]] = nums[2] = 1  
ans[4] = nums[nums[4]] = nums[3] = 2  
ans[5] = nums[nums[5]] = nums[4] = 3*

**Example 3:**  
Input: `nums = [4,3,2,1,0]`  
Output: `[0,1,2,3,4]`  
*Explanation:  
All indices mapped back to the reverse ordering.*

### Thought Process (as if you’re the interviewee)  
The problem is essentially about using each value in the array as an index to fetch another value.  
- **Brute-force:** Create a new array, iterate through nums, and for each index i, set ans[i] = nums[nums[i]]. This is direct and very readable.
- **Optimized in-place:**  
  - If the follow-up asks for O(1) space (without using extra output array), since every element in nums is in the range [0, n-1], it's possible to encode two numbers at each position using arithmetic tricks (e.g., `nums[i] += n × (nums[nums[i]] % n)`), then decode in a second pass.
  - But for interviews, unless in-place/space concerns are explicitly raised, prefer clarity: build the new list.

Trade-off:  
- Clarity and safety (new array) vs. clever in-place with trickier arithmetic (compression).  
- Since function should not modify input unless required, default to output array.

### Corner cases to consider  
- Single element: `` → ``
- Two elements: `[1,0]` → `[0,1]`
- Input already sorted: `[0,1,2,...,n-1]` → stays the same
- Input reverse order: `[n-1, n-2, ..., 0]` → `[0,1,2,...,n-1]`
- Empty input: not allowed due to constraint n ≥ 1
- Large n: Check for efficiency

### Solution

```python
def buildArray(nums):
    # Create the output array
    n = len(nums)
    ans = [0] * n
    for i in range(n):
        # For each index i, assign ans[i] = nums[nums[i]]
        ans[i] = nums[nums[i]]
    return ans
```

#### One-liner version (Pythonic way for interviews):
```python
def buildArray(nums):
    # List comprehension - direct mapping
    return [nums[num] for num in nums]
```

#### In-place solution (advanced, only if asked):
```python
def buildArray(nums):
    n = len(nums)
    for i in range(n):
        # Encode both old and new value at nums[i]
        nums[i] += n * (nums[nums[i]] % n)
    for i in range(n):
        # Extract the new value
        nums[i] //= n
    return nums
```
*(Not recommended unless interviewer requests!)*

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Single pass through input array to build result.  
- **Space Complexity:** O(n) for the new output array (unless O(1) in-place trick is used, which mutates input).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this using only O(1) extra space (i.e., without using a separate output array)?  
  *Hint: Encode two values per index, since nums only contains 0…n-1.*

- Could you handle the case where nums might NOT be a valid permutation?  
  *Hint: Add validation step to check for duplicates or values out of range.*

- What if you wanted to generalize this to k-permutations (nums[nums[...nums[i]]]) k times?  
  *Hint: You’d need a loop per index, or maybe matrix exponentiation for large k.*

### Summary
This problem uses the "build new array using index mapping" pattern — commonly seen in permutation, transformation, or simulation problems. A direct O(n) solution is the most readable and bug-free. The O(1) in-place trick leverages value encoding/decoding and is a useful pattern when space efficiency is needed and input is guaranteed to follow certain constraints (values in restricted range). This pattern also appears in problems involving cyclic replacement or in-place permutation.