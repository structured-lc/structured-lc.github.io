### Leetcode 2654 (Medium): Minimum Number of Operations to Make All Array Elements Equal to 1 [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-make-all-array-elements-equal-to-1)

### Description  
You are given an array of positive integers. In one operation, you can pick any two adjacent elements and replace one of them with their greatest common divisor (gcd). The task is to determine the minimum number of operations required to make all elements in the array equal to 1. If it’s impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums = [2,6,3,4]`  
Output: `4`  
*Explanation:  
Find smallest subarray with gcd 1. [6,3,4] has gcd 1 (in 2 operations: gcd(6,3)=3, then gcd(3,4)=1).  
After creating one 1, replace all other numbers with 1 in n-1 more steps.  
Total: subarray length - 1 (2 operations) + n-1 (3 operations) = 4.*

**Example 2:**  
Input: `nums = [2,10,6,14]`  
Output: `-1`  
*Explanation:  
The gcd of the whole array is 2. There is no way to make any element become 1 with gcd operations. Return -1.*

**Example 3:**  
Input: `nums = [1,1,1]`  
Output: `0`  
*Explanation:  
All elements are already 1. No operations needed.*

### Thought Process (as if you’re the interviewee)  
First, to get a 1 anywhere in the array, some contiguous subarray must have gcd=1. If the global gcd is >1, it's impossible to get any 1, as gcd never increases.  
If there is already a 1 present, then turning all other numbers into 1 requires n - count_of_ones operations (change all non-1s one-by-one using an adjacent 1).  
If there is no 1, we must look for the shortest subarray with gcd 1. The minimum operations to get the first 1 is (length of that subarray - 1), then n-1 more for converting the rest. Try all possible subarrays to find the minimum length where gcd=1.

### Corner cases to consider  
- Array contains only 1s (output 0).
- Array where global gcd > 1 (output -1).
- All elements are already the same but not 1 (output depends on gcd).
- Only one element in the array.
- Large arrays with no subarrays of gcd 1.

### Solution

```python
def min_operations(nums):
    n = len(nums)
    
    # If there is already a 1
    count_ones = nums.count(1)
    if count_ones:
        return n - count_ones
    
    # No 1s, check full array gcd
    from math import gcd

    total_gcd = nums[0]
    for num in nums[1:]:
        total_gcd = gcd(total_gcd, num)
    if total_gcd != 1:
        return -1
    
    # Find smallest subarray with gcd 1
    min_len = n + 1
    for i in range(n):
        g = nums[i]
        for j in range(i+1, n):
            g = gcd(g, nums[j])
            if g == 1:
                min_len = min(min_len, j - i + 1)
                break
    
    # First get a 1 in (min_len - 1) ops, then turn rest (n-1) to 1
    return (min_len - 1) + (n - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each start index we may scan the entire subarray to compute gcds.
- **Space Complexity:** O(1) extra space, besides input and loop variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize subarray gcd computation for large arrays?
  *Hint: Use segment trees or memoization for repeated gcd queries.*

- What changes if you can choose any pair (not just adjacent) in an operation?
  *Hint: Think about the connectivity structure; fewer restrictions.*

- How would your solution change if negative numbers or zeros are allowed?
  *Hint: GCD properties and array invariants are different with zero/negatives.*

### Summary
This problem uses **GCD** properties and a two-stage greedy-counting approach: First, reduce to the minimal number of operations to create a single 1 by searching for the shortest subarray with gcd 1 (brute-force two pointer). Then, since 1 can convert all surrounding numbers to 1 in one move per number, we simply count remaining steps. This "modular subproblem" and stepwise approach is common in interview problems dealing with **gcd, array reduction, and minimal operations**.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
