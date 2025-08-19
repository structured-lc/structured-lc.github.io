### Leetcode 3315 (Medium): Construct the Minimum Bitwise Array II [Practice](https://leetcode.com/problems/construct-the-minimum-bitwise-array-ii)

### Description  
Given an array `nums` of n **prime** integers, construct an array `ans` of length n such that for each index i:  
- bitwise OR of `ans[i]` and `ans[i]+1` equals `nums[i]`, i.e.:  
  ans[i] OR (ans[i] + 1) == nums[i].  
- Choose the **minimum** possible value for each `ans[i]` that satisfies this.
- If no such value exists for some index i, set `ans[i] = -1`.

### Examples  

**Example 1:**  
Input: `nums = [3, 5, 7]`  
Output: `[2, 4, 6]`  
*Explanation:*
- For i=0: 2 OR 3 = 3  
- For i=1: 4 OR 5 = 5  
- For i=2: 6 OR 7 = 7  
All satisfy the constraint with the minimum possible value.

**Example 2:**  
Input: `nums = [13, 17]`  
Output: `[12, 16]`  
*Explanation:*
- For i=0: 12 OR 13 = 13  
- For i=1: 16 OR 17 = 17

**Example 3:**  
Input: `nums = [2, 11]`  
Output: `[ -1, 10 ]`  
*Explanation:*
- For i=0: No value of x such that x OR (x+1) == 2, so ans=-1  
- For i=1: 10 OR 11 = 11

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each i, iterate over all possible x, check if x OR (x+1) == nums[i], select the minimum x, otherwise -1.
    - This is too slow for large numbers.
- Optimized:
    - Observation: Since nums[i] is **prime** and x OR (x+1) produces consecutive numbers, possibly only certain bit-patterns work.
    - For nums[i], since next pair x,x+1 only flips the rightmost zero bit, if nums[i] is even, the lowest x would generally be nums[i]-1.
    - For odd primes:
        - Try x=nums[i]-1: (nums[i]-1) OR nums[i] = ? If it matches nums[i], use x=nums[i]-1.
        - If not, try x=nums[i]-2, check up.
    - Upon closer checking: To get ans[i] OR (ans[i]+1) == nums[i], for even nums[i], x=nums[i]-1 works; for odd primes (except 2) x=nums[i]-1 also works (because for odd primes >2, nums[i]-1 is even and nums[i] odd, so OR gives all bits of nums[i]), but for 2 this fails.
    - For 2, check possible x: x=0 (0 OR 1=1), x=1 (1 OR 2=3), so not possible, ans=-1.

Final approach: 
- For each nums[i]:
    - Try x = nums[i] - 1. If x OR (x+1) == nums[i], take x.
    - Else, try x = nums[i] - 2 if x OR (x+1) == nums[i], take x.
    - If nothing works, ans[i]=-1.
- Alternatively, since the problem guarantees primes, and as shown above, except for 2, x=nums[i]-1 works for all (because for odd primes >2, (p-1) is even and (p-1) OR p = all bits of p.)

### Corner cases to consider  
- nums contains the smallest prime (2), which cannot be represented, so output is -1 for this entry.
- Larger, odd primes: always x=nums[i]-1.
- Check for multiple consecutive 2s.
- Single element.
- Only odd primes.

### Solution

```python
def construct_min_bitwise_array(nums):
    ans = []
    for num in nums:
        # For each number, try the smallest possible x such that x | (x+1) == num
        found = False
        # Only need to check x = num-1 and x = num-2 (since num is prime, so small gap)
        for x in [num - 1, num - 2]:
            if x >= 0 and (x | (x + 1)) == num:
                ans.append(x)
                found = True
                break
        if not found:
            ans.append(-1)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
    - For each element, we do O(1) work (constant number of checks).
- **Space Complexity:** O(n)  
    - The answer array is O(n), and no extra significant storage is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums contains **non-prime** numbers?
  *Hint: Consider the bit-patterns of composite numbers for x OR x+1.*
  
- Can you do this **in-place**, without extra memory?
  *Hint: Overwrite the input or discuss output constraints.*

- What if the constraints on the **range of nums[i]** are much larger (e.g., up to 10¹⁸)?  
  *Hint: Can you create a formula for the answer directly, or prove in which cases a solution does/does not exist?*

### Summary
This problem leverages bitwise manipulation and relies on the unique properties of primes, particularly how consecutive integers' bitwise OR produces transitions in bit patterns. The solution uses observations about odd primes vs. the only even prime (2) for a near-O(1) per-entry answer. Pattern: greedy/bitwise property. Applicable when bit manipulation and integer patterns are involved, especially with primes or structured integer sets.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
