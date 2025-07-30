### Leetcode 3630 (Hard): Partition Array for Maximum XOR and AND [Practice](https://leetcode.com/problems/partition-array-for-maximum-xor-and-and)

### Description  
Given an integer array **nums**, partition it into three non-overlapping subsets A, B, and C such that every number belongs to exactly one subset.  
- Let **XOR(A)** be the bitwise XOR of all elements in subset A.
- Let **AND(B)** be the bitwise AND of all elements in subset B.
- Let **XOR(C)** be the bitwise XOR of all elements in subset C.  
Compute the **maximum value possible for:**  
**XOR(A) + AND(B) + XOR(C)**  
Return this maximum value.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `6`  
Explanation:  
Possible way:  
A = [1], B = [2], C = [3]  
XOR(A) = 1, AND(B) = 2, XOR(C) = 3  
XOR(A) + AND(B) + XOR(C) = 1 + 2 + 3 = 6

**Example 2:**  
Input: `nums = [1, 3, 2]`  
Output: `5`  
Explanation:  
Possible way:  
A = [1], B = [3], C = [2]  
XOR(A) = 1, AND(B) = 3, XOR(C) = 2  
Sum = 1 + 3 + 2 = 6  
However, the best partition is A = [3], B = [2], C = [1], which produces:  
3 + 2 + 0 = 5

**Example 3:**  
Input: `nums = [2, 3, 6, 7]`  
Output: `14`  
Explanation:  
A = [2, 7], B = , C = [3]  
XOR(2,7) = 5, AND(6) = 6, XOR(3) = 3  
5 + 6 + 3 = 14

### Thought Process (as if you're the interviewee)  
- The naive way is to iterate over all possible partitions of nums into three subsets (A, B, C), compute each expression, and take the max.  
- For **n** elements, each number can go into A, B, or C → \(3^n\) possibilities (not efficient for n > 15).  
- Let's optimize:
  - Note AND(B) is maximized when B contains fewer high bits; all bits in AND(B) must be present in all members of B.
  - If we fix B, then optimize the remaining set S = nums - B into A and C to maximize XOR(A) + XOR(C). This is the classic "partition set into 2 subsets so that sum of XOR is maximized".
  - Idea: Enumerate all B (all subsets), for each B compute AND(B), and for S=nums−B compute the maximal XOR(A)+XOR(C) split by using linear basis (XOR basis or bitmask DP).
  - The main bottleneck is iterating all 2ⁿ subsets for B, but for small n (≤16), this is feasible.
  - For each B (as a bitmask), S = nums \ B, then use basis to get maximum possible XOR(A) + XOR(C).
  - Alternative: Precompute all possible XORs in S for quick max split.
  - Trade-offs: Brute-force too slow, so subset enumeration plus efficient sub-subset optimization is optimal.

### Corner cases to consider  
- Empty array (invalid per problem)
- All numbers equal
- Only one element
- Array with all zeroes
- B is empty (AND(undefined), need to handle this guardrail)
- S is empty (only B is nonempty, A and C are empty)
- Large bits in nums

### Solution

```python
def partitionArrayMaxXorAnd(nums):
    n = len(nums)
    max_value = 0

    # Precompute all subsets of nums as B
    for mask in range(1, 1 << n):  # B must be non-empty
        # Build subset B and S (complement), record AND(B)
        B = []
        S = []
        for i in range(n):
            if (mask >> i) & 1:
                B.append(nums[i])
            else:
                S.append(nums[i])
        # Compute AND(B)
        and_B = B[0]
        for num in B[1:]:
            and_B &= num
        # Now split S into 2 groups: maximize XOR(A) + XOR(C)
        total_xor = 0
        for num in S:
            total_xor ^= num
        # Try all possible partitions of S into A and C:
        sublen = len(S)
        # To avoid duplicating partitions (A,C) ~ (C,A), only iterate over half
        seen = set()
        for submask in range(1 << sublen):
            # To avoid A, C <==> C, A counted twice, only submask ≤ complement
            othermask = ((1 << sublen) - 1) ^ submask
            if submask in seen or othermask in seen:
                continue
            seen.add(submask)
            seen.add(othermask)

            xor_A = 0
            for j in range(sublen):
                if (submask >> j) & 1:
                    xor_A ^= S[j]
            xor_C = total_xor ^ xor_A
            sum_value = xor_A + and_B + xor_C
            if sum_value > max_value:
                max_value = sum_value
    return max_value
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For n elements:  
  - Enumerate all subsets B: \(2^n\)
  - For each subset B, S has up to n elements, so 2ⁿ submasks to try for splitting A/C within S.
  - Overall: \(O(3^n)\), since for each bit nums[i] can be A, B, or C.
- **Space Complexity:**  
  - O(n) for holding subsets.

### Follow-up questions  
- Can you solve this for large n (e.g., n = 30)?  
- Can you optimize the splitting of S into A, C using properties of XOR (e.g., XOR basis, fast bitmask DP)?