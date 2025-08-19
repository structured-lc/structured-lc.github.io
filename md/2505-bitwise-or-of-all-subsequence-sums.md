### Leetcode 2505 (Medium): Bitwise OR of All Subsequence Sums [Practice](https://leetcode.com/problems/bitwise-or-of-all-subsequence-sums)

### Description  
Given an integer array **nums**, return the value of the **bitwise OR** of the sum of all possible subsequences.  
A subsequence is any sequence that can be formed by deleting zero or more elements, without changing the order of the remaining elements. Compute the sum for every possible subsequence (including the empty subsequence), then return the bitwise OR (|) of all those sum values.

### Examples  

**Example 1:**  
Input: `nums = [2,1,0,3]`  
Output: `7`  
Explanation:  
All possible subsequence sums are 0, 1, 2, 3, 4, 5, 6.  
Bitwise OR: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 7.

**Example 2:**  
Input: `nums = [0,0,0]`  
Output: `0`  
Explanation:  
The only possible subsequence sum is 0.

**Example 3:**  
Input: `nums = [1,2,4]`  
Output: `7`  
Explanation:  
All possible subsequence sums: 0, 1, 2, 3, 4, 5, 6, 7.  
OR: 0 | 1 | ... | 7 = 7.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Calculate every subsequence sum (2ⁿ total subsequences), store all unique sums then perform bitwise OR.  
  This is infeasible for n > 20 due to exponential growth.

- **Observation:**  
  Each number’s bits contribute to sums with and without other elements. Almost all combinations of sums between 0 and the total sum can be “constructed,” causing the bitwise OR to usually be all bits set in the total sum.

- **Efficient approach:**  
  - Start with ans = 0 and prefix_sum = 0.
  - For each number, update prefix_sum += num, and do ans |= (num | prefix_sum).
  - This checks each prefix and the individual value, ensuring all achievable bits are OR'ed in.

  - The efficient way exploits the fact that, for *this constraint*, any OR combination for all (partial) sums will cover all bits present in any prefix sum or element.
  
  - This solution is linear time and space, O(n), which is acceptable for n ≤ 10⁵.

### Corner cases to consider  
- Empty array (though per constraints, array has at least 1 element)
- All zeros: [0, 0, 0] → answer is 0.
- Array with one element: [x] → answer is x.
- Very large single value: [10⁹].
- Array where all elements are the same.
- Array with only powers of 2: [1,2,4,8].
- Array with increasing or decreasing order.

### Solution

```python
def subsequenceSumOr(nums):
    # Initialize result for keeping the bitwise OR
    ans = 0
    # Running sum of prefix elements
    prefix = 0
    for num in nums:
        prefix += num
        # OR in the number and the running prefix sum
        ans |= num | prefix
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We do a single pass over the array and constant-time operations per iteration.
- **Space Complexity:** O(1). We only use variables for the answer and prefix sum, with no additional storage scaling with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you were asked for the sum (not OR) of all subsequence sums?
  *Hint: Try to use properties of subsets and combinatorics.*

- Could you do this if array elements were negative?
  *Hint: Would the bitwise OR property still work? What happens to possible sums?*

- What if we restrict subsequence to only contiguous subsequences?
  *Hint: Would the pattern or result change?*

### Summary
This problem leverages **subsequence generation**, **bit manipulation**, and the **bitwise OR** operation.  
The crucial insight is that the OR of all sums is captured by OR’ing the prefix sums and values themselves, making the solution **linear** in time and **constant** in space.  
This pattern—summarizing over all subsequences using bitwise properties—occasionally appears in combinatorial problems, dynamic programming on subsets, and when asked for “union” or “aggregate” properties over all subsets or subsequences.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation), Brainteaser(#brainteaser), Prefix Sum(#prefix-sum)

### Similar Problems
- Bitwise ORs of Subarrays(bitwise-ors-of-subarrays) (Medium)