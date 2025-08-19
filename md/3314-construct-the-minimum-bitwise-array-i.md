### Leetcode 3314 (Easy): Construct the Minimum Bitwise Array I [Practice](https://leetcode.com/problems/construct-the-minimum-bitwise-array-i)

### Description  
Given an array **nums** of length n consisting of n prime numbers, construct an array **ans** of length n where, for each index i,  
ans[i] OR (ans[i]+1) == nums[i],  
with **ans[i]** minimized as much as possible.  
If it is *not possible* to do so for an index, set ans[i] = -1.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 5, 7]`  
Output: `[-1, 1, 4, 3]`  
Explanation:  
- 2: There is no integer a where a OR (a+1) == 2, so -1.  
- 3: 1 OR 2 = 3. Smallest is a=1.  
- 5: 4 OR 5 = 5. Smallest is a=4.  
- 7: 3 OR 4 = 7, but 5 OR 6 = 7 as well; 3 is smaller than 5, so a=3.

**Example 2:**  
Input: `nums = [2, 13, 3]`  
Output: `[-1, 12, 1]`  
Explanation:  
- 2: Cannot construct, so -1.  
- 13: 12 OR 13 = 13. So a=12.  
- 3: 1 OR 2 = 3. So a=1.

**Example 3:**  
Input: `nums = [2]`  
Output: `[-1]`  
Explanation:  
- 2: Only even prime, cannot construct.

### Thought Process (as if you’re the interviewee)  
- The key requirement is ans[i] OR (ans[i]+1) == nums[i] with ans[i] minimized.
- Since nums[i] is always prime and >1, consider binary properties of OR.
- For 2 (the only even prime), there don't exist two consecutive integers a, a+1 with a OR (a+1) == 2, so answer is -1.
- For odd primes, to minimize ans[i], look for the lowest number a such that a OR (a+1) == nums[i].
  - Consecutive pairs with OR = nums[i] will have the lowest bits in a that satisfy the equation.
- Brute force would check all possibilities for each nums[i]   (very inefficient for larger numbers).
- **Optimized Approach:**
  - For odd nums[i], find the rightmost 0 in the binary representation and set all lower bits to 1 and that 0 to 0 (i.e., a = nums[i] & ~(1 << k) | ((1 << k) - 1)), but a simpler approach: for odd primes, choose ans[i] = nums[i] - 1 if (nums[i]-1) OR nums[i] == nums[i].
  - But in practice, for any odd prime x, ans = x-1 if (x-1) is even, otherwise try a in [1,x-1] with a OR (a+1) == x.

### Corner cases to consider  
- nums[i] == 2 (the only even prime): always -1.
- Large primes (e.g., 99991) -- ensure efficiency.
- Duplicate primes in nums (should work per index).
- Single element array, e.g., [2] or [3].
- Unusual primes, i.e., Mersenne primes like 7, 31.
- All "impossible" entries, e.g., [2, 2, 2].

### Solution

```python
def construct_min_bitwise_array(nums):
    ans = []
    for x in nums:
        # Case 1: x == 2 (even prime) → impossible
        if x == 2:
            ans.append(-1)
            continue
        found = False
        # Try all a such that a OR (a+1) == x, but only up to x-1, and minimize a.
        for a in range(1, x):  # must be at least 1
            if (a | (a+1)) == x:
                ans.append(a)
                found = True
                break
        if not found:
            ans.append(-1)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × p), where p is the average of nums[i] (but since all are primes and reasonably small, this is usually fine; or O(n log M) if we optimize bit checks).
- **Space Complexity:** O(n) for the output array ans.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums contains numbers other than primes?  
  *Hint: Some composite numbers can be constructed, others cannot—think about their bit patterns.*

- Can you solve this in O(n) time no matter the values in nums?  
  *Hint: Is there a constant-time formula given the properties of x?*

- How would you handle an array containing up to 10⁶ elements?  
  *Hint: Optimize by analyzing bit patterns directly, not by brute-force.*

### Summary
This problem exercises bit manipulation and pattern observation, especially leveraging the properties of the bitwise OR for two consecutive numbers. The brute-force approach is acceptable for small primes but can be optimized efficiently for large or streaming data using direct bit analysis for odd primes. This type of problem appears in bitmasking, greedy, and constructive algorithm design commonly seen in interviews.

### Tags
Array(#array), Bit Manipulation(#bit-manipulation)

### Similar Problems
