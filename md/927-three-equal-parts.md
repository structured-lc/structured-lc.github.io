### Leetcode 927 (Hard): Three Equal Parts [Practice](https://leetcode.com/problems/three-equal-parts)

### Description  
Given a binary array `arr` (contains only 0s and 1s), divide it into three **contiguous, non-empty parts** so that **each part represents the same integer value when viewed as a binary number** (including leading zeroes).  
You must return the indices `[i, j]` where:
- The first part is `arr[0..i]`
- The second part is `arr[i+1..j-1]`
- The third part is `arr[j..n-1]`  
If no such split is possible, return `[-1, -1]`.

### Examples  

**Example 1:**  
Input: `[1,0,1,0,1]`,  
Output: `[0,3]`  
*Explanation:  
- Partition: [1], [0,1], [0,1]  
- Each part represents the number 1 in binary.*

**Example 2:**  
Input: `[1,1,0,1,1]`,  
Output: `[-1,-1]`  
*Explanation:  
- Total 1s = 4, which cannot be divided equally into 3 parts.*

**Example 3:**  
Input: `[0,0,0,0,0]`,  
Output: `[0,2]`  
*Explanation:  
- All zeros, so any partition will work (since 0 == 0 == 0).*

### Thought Process (as if you’re the interviewee)  
Let’s consider the requirements:
- The three parts need to **represent the same binary value**.
- Since leading zeroes are allowed, [0,1,1] and [1,1] are equivalent.
  
Initial brute-force would be to check all possible pairs of splits, which has O(n²) or worse time — too slow for n up to 10⁵.

#### Key Deductions:
1. **Number of 1s must be divisible by 3**:  
   If not, immediately return `[-1,-1]` (since every part must contribute the same number of 1s)[2][4].
2. **All Zero Case**:  
   If `arr` has only zeros, any partition will do; return `[0, n-1]`[2][4].
3. **Find the partitions**:  
   Let k = number of 1s in each part. Use pointers to locate the starting index of each of the three parts.
4. **Compare segments**:  
   Since trailing zeros (at the end) matter, need to match the sequences at those starting points — including leading zeros.
5. **Return indices if equal, else [-1, -1]**.

### Corner cases to consider  
- Array of all zeros: `[0,0,0,0]`
- Array has fewer than 3 ones, so cannot split: `[1,0]`
- Array of all ones, length not divisible by 3: `[1,1,1,1]`
- Partitions fail only because of extra zeros in the middle or end
- Subarrays that match only if you include/truncate leading/trailing zeros

### Solution

```python
def threeEqualParts(arr):
    n = len(arr)
    total_ones = sum(arr)
    
    # Case 1: All zeros
    if total_ones == 0:
        return [0, n - 1]
    
    # If total number of 1s isn't divisible by 3, impossible
    if total_ones % 3 != 0:
        return [-1, -1]
    
    k = total_ones // 3
    
    # Find start index of 1st, 2nd, and 3rd part
    ones_idx = [i for i, num in enumerate(arr) if num == 1]
    first = ones_idx[0]
    second = ones_idx[k]
    third = ones_idx[2*k]
    
    # Since the pattern must match till the end, check length of suffix
    while third < n:
        if arr[first] != arr[second] or arr[second] != arr[third]:
            return [-1, -1]
        first += 1
        second += 1
        third += 1
    
    # The split should be:
    # arr[0..first-1], arr[first..second-1], arr[second..n-1]
    return [first - 1, second]

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Finding the 1s, then single linear scan to compare parts.
- **Space Complexity:** O(n)  
  - For storing the indices of 1s in `ones_idx` (could optimize to O(1) by counting).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is huge and doesn't fit in memory?  
  *Hint: Can you process it in chunks, or with streaming logic?*

- Can you do this without extra space?  
  *Hint: Just use counters and indexes, no need to store all 1s’ positions.*

- What if you need to partition into k equal parts?  
  *Hint: Is the ‘number of ones’ divisible by k? How to generalize the pointer-matching?*

### Summary
This problem leverages **partitioning by number of 1s** and matching binary patterns — it’s a classic **two (or k) pointers** pattern plus careful edge handling. Recognizing invariants (like sum of 1s mod 3 == 0) is the core insight. This technique is valuable for any problem requiring splitting into parts with identical sums/values or patterns.