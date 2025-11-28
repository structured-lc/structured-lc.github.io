### Leetcode 3539 (Hard): Find Sum of Array Product of Magical Sequences [Practice](https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences)

### Description  
Given an integer array nums and two integers k and m, a **magical sequence** is a subsequence of nums of length m such that the bitwise OR of the chosen elements has exactly k set bits (i.e., in binary, it has k ones).  
You are to **return the sum of the products of all valid magical sequences**. Since the result may be large, return it modulo 10⁹+7.

Explained simply:  
- You need to select all subsequences of nums that have exactly m elements and OR together have exactly k '1' bits in their representation.
- For each such subsequence, compute the product of its elements.
- Return the sum of these products.

### Examples  

**Example 1:**  
Input: `nums = [2, 1, 3], k = 2, m = 2`  
Output: `5`  
*Explanation:  
Subsequences of length 2:  
- [2, 1]: OR is 3 (11₂) → 2 set bits, product = 2×1 = 2  
- [2, 3]: OR is 3 (11₂) → 2 set bits, product = 2×3 = 6  
- [1, 3]: OR is 3 (11₂) → 2 set bits, product = 1×3 = 3  
Only subsequences that satisfy the condition are those above. The sum of their products is 2 + 6 + 3 = 11.*  

**Example 2:**  
Input: `nums = [4, 6], k = 1, m = 1`  
Output: `0`  
*Explanation:  
Subsequences of length 1: [4] and .  
OR(4) = 4 (100₂) → 1 set bit, product = 4  
OR(6) = 6 (110₂) → 2 set bits, so invalid  
Only [4] with 1 set bit; sum = 4.*  

**Example 3:**  
Input: `nums = [1,2,4], k = 2, m = 2`  
Output: `0`  
*Explanation:  
All possible pairs: [1,2] (OR=3, has 2 bits), [1,4] (OR=5, has 2 bits), [2,4] (OR=6, has 2 bits).  
Their products are 1×2=2, 1×4=4, 2×4=8; sum = 2+4+8=14.*  


### Thought Process (as if you’re the interviewee)  
- Brute force: Try all possible subsequences of length m, compute OR, check if the number of set bits is k. If so, compute the product and add to the sum.
  - This is O(nᵐ) and will not work for large n or m.
- To optimize:  
  - Notice that the problem is about picking m-length subsequences with a particular OR property.  
  - Use dynamic programming:  
    - State: dp[pos][cnt][mask] = sum of products formed by considering elements up to index pos, using cnt elements, where the OR so far is mask  
    - Base case: dp[-1] = 1  
    - For each element, either skip it or include it (inclusion increases cnt and updates OR-mask + multiplies product)
    - DP transitions through pos, cnt, and mask  
    - The answer: sum all dp[n][m][mask] for mask with exactly k set bits  
  - Bitmask can go up to max value of individual numbers, so reasonably feasible if numbers are small or have bounded bits.
- Trade-Offs:  
  - Time depends on n, m, and bit-mask width; optimized for small/medium parameters.
  - If the value range of nums is very large, more optimization may be needed.

### Corner cases to consider  
- nums has all zeros (OR is always zero, number of set bits may be only zero, so may output 0 if k > 0)
- nums has duplicate elements
- m = 0 (only empty subsequence, edge case)
- k = 0 (require all zeros in OR)
- m > len(nums) (no subsequence)
- nums contains only one element
- Some nums have numbers with many bits set

### Solution

```python
MOD = 10**9 + 7

def findSumOfArrayProductOfMagicalSequences(nums, k, m):
    from collections import defaultdict

    n = len(nums)
    max_num = max(nums, default=0)
    max_mask = 0
    for x in nums:
        max_mask |= x

    # We'll limit bitmask to reasonable width
    max_bit = max_mask.bit_length()

    # dp[pos][cnt][mask]: sum of products for using cnt elements from nums[:pos], with OR == mask
    # We only need to keep previous/current dp layers to save space

    dp = [defaultdict(int) for _ in range(m+2)]  # dp[cnt][mask] = sum_of_products

    dp[0][0] = 1  # base: 0 elements, OR=0, product=1

    for num in nums:
        # Iterate in reverse to avoid double-counting
        for cnt in range(m-1, -1, -1):
            for mask, prod_sum in list(dp[cnt].items()):
                new_mask = mask | num
                dp[cnt+1][new_mask] = (dp[cnt+1][new_mask] + prod_sum * num) % MOD

    ans = 0
    for mask in dp[m]:
        if bin(mask).count('1') == k:
            ans = (ans + dp[m][mask]) % MOD

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × 2ᴮ), where n = len(nums), m is the subsequence length, and B is the maximum bit width in any number in nums. For each num, for each count (up to m), and each possible OR-mask.
- **Space Complexity:** O(m × 2ᴮ), we keep m+1 dp layers, each with up to 2ᴮ possible OR-masks.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums contains very large numbers (e.g., up to 2³¹)?  
  *Hint: Can you limit the bitmask space further or prune unnecessary branches?*

- How would you optimize for very large n but small m or k?  
  *Hint: Consider combinations or pruning states by OR masks that can't reach k set bits.*

- Can this be solved with iterative combinatorial enumeration and meets-in-the-middle or other advanced DP tricks?  
  *Hint: Think of splitting the array for efficiency if bitmask space is the bottleneck.*

### Summary
This approach is an application of **combinatorial dynamic programming with bitmask state** (also called *subset DP*). It is a powerful pattern for "choose-subsequence/combination with property" problems, especially involving AND/OR/XOR statistics. Similar logic applies in problems involving subset sums, counting XOR combinations, or sum-based DP over subsequences. Optimizations include pruning by impossible masks and limiting to reachable DP states.


### Flashcard
Use DP with state dp[pos][cnt][mask] = sum of products using cnt elements up to position pos with OR value mask; transition by including/excluding current element.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Combinatorics(#combinatorics), Bitmask(#bitmask)

### Similar Problems
- Product of Array Except Self(product-of-array-except-self) (Medium)
- Smallest Number With All Set Bits(smallest-number-with-all-set-bits) (Easy)