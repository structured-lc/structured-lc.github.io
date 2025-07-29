### Leetcode 2835 (Hard): Minimum Operations to Form Subsequence With Target Sum [Practice](https://leetcode.com/problems/minimum-operations-to-form-subsequence-with-target-sum)

### Description  
Given an array **nums** of non-negative powers of 2 (e.g., nums could contain values like 1, 2, 4, 8, ...) and an integer **target**. You can choose any nums[i] > 1 and perform an operation where you remove it from the array and add two of nums[i] / 2 at the end of the array.  
Your task is to determine the **minimum number of operations needed** so that there exists a **subsequence** of nums (possibly after some operations) whose sum is exactly target. If impossible, return -1.

- You may perform operations any number of times.
- You may only choose elements >1 to split.
- Subsequences are ordered: you cannot rearrange the array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,8], target = 7`  
Output: `1`  
*Explanation: Split 8 into two 4's. Array becomes [1,2,4,4]. Subsequence [1,2,4] sums to 7.*

**Example 2:**  
Input: `nums = [1,32,1,2], target = 12`  
Output: `2`  
*Explanation: Split 32 → two 16's (array→[1,1,2,16,16]), split 16 → two 8's (array→[1,1,2,16,8,8]), subsequence [2,8,1,1] sums to 12.*

**Example 3:**  
Input: `nums = [1,1,1,1], target = 10`  
Output: `-1`  
*Explanation: No operation can increase sum. The total is 4, so impossible to reach 10.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible combinations of operations and subsequences. This quickly becomes intractable due to the exponential number of possibilities.

- **Observation:**  
  The core of the problem is that operations let us "break down" large numbers into smaller powers of two, essentially letting us turn a bigger value into two smaller values to match the binary representation of target.

- **Optimal Approach:**  
  - Count how many times each power of 2 occurs in `nums`.
  - Decompose `target` into its binary representation (e.g. 7 → `0b111` → need one 1, one 2, one 4).
  - For each bit (least to most significant), if we need that bit and have one in `nums`, use it. If not, we need to "make" it by splitting higher values.
  - The **minimal number of operations** is the minimal number of splits needed when some required bit is missing but a higher power is available to split down to cover it.
  - If at any point, even after all splits, we can't assemble the target sum, return -1.
  
- **Trade-offs:**  
  This approach is O(n + 31) with very low overhead since the max bit length is fixed. It efficiently counts, checks, and splits as needed without unnecessary recomputation.

### Corner cases to consider  
- No way to reach target (e.g., total sum(nums) < target)
- All nums are smaller/larger than needed bits
- nums contains duplicate values
- Minimal input (nums has length 1)
- Large gaps in available powers (e.g. only high and low, nothing in between)
- Many required operations, or none needed

### Solution

```python
def minOperations(nums, target):
    # Count of each power of 2 in nums
    cnt = [0] * 32
    for num in nums:
        cnt[num.bit_length() - 1] += 1

    ans = 0          # Total operations
    carry = 0        # Bits we need to "make up for" in future
    for i in range(32):   # For each bit (from least to most significant)
        if (target >> i) & 1:    # Need one 2^i
            if cnt[i] > 0:
                cnt[i] -= 1
            else:
                # Need to "break" higher power
                j = i + 1
                while j < 32 and cnt[j] == 0:
                    j += 1
                if j == 32:
                    return -1        # Not possible
                # Split at higher power and count needed splits
                while j > i:
                    cnt[j] -= 1
                    cnt[j-1] += 2
                    ans += 1
                    j -= 1
                cnt[i] -= 1   # Now, we have this bit
        # Combine leftovers: every two 2^i can be promoted to one 2^{i+1}
        if cnt[i] > 1:
            cnt[i+1] += cnt[i] // 2

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + 31) = O(n).  
  - We count occurrences in O(n).
  - We scan up to 32 bits: negligible compared to n.
- **Space Complexity:** O(1).  
  - Extra storage for cnt array of length 32 (fixed, does not scale with input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the target could be up to 10¹⁸ and some nums are very large?
  *Hint: How does the approach scale with larger 'powers'? Can you generalize for arbitrary bit lengths?*

- If order of subsequence didn't matter (permutation allowed), does your solution change?
  *Hint: Would "permutation" change how you match up available bits?*

- Suppose a single element can be split more than once in one move, or you can split any number into any combination of smaller powers?
  *Hint: Is the "split to halves" restriction essential to your binary-based approach?*

### Summary
This problem uses a **Greedy + Bitmasking** coding pattern: decompose the target into binary bits, and try to meet those needs using available powers in nums, greedily splitting larger powers as few times as possible to make up missing ones. This kind of pattern—matching target binary representation by combining/splitting available numbers—is widely applicable for power-of-two, resource consolidation, or chip-fabrication style problems. The key insight is how to efficiently break and assemble necessary parts with minimal intervention, always deferring to the next available larger bit for splits.