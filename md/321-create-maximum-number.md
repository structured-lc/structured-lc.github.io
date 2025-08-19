### Leetcode 321 (Hard): Create Maximum Number [Practice](https://leetcode.com/problems/create-maximum-number)

### Description  
You are given two integer arrays **nums1** and **nums2**, representing the digits of two numbers. Your task is to create the **maximum number of length k** (where k ≤ len(nums1) + len(nums2)) by picking digits from the two arrays.  
- The digits from each array must **keep their original relative order**.  
- Return an array of the k digits representing this largest number.

### Examples  

**Example 1:**  
Input: `nums1 = [3,4,6,5]`, `nums2 = [9,1,2,5,8,3]`, `k = 5`  
Output: `[9,8,6,5,3]`  
*Explanation: Take [6,5] from nums1 and [9,8,3] from nums2 for the lexicographically largest result in order.*

**Example 2:**  
Input: `nums1 = [6,7]`, `nums2 = [6,0,4]`, `k = 5`  
Output: `[6,7,6,0,4]`  
*Explanation: Take all from nums1 ([6,7]) and [6,0,4] from nums2 and merge.*

**Example 3:**  
Input: `nums1 = [3,9]`, `nums2 = [8,9]`, `k = 3`  
Output: `[9,8,9]`  
*Explanation: You can select  from nums1 and [8,9] from nums2; merge gives [9,8,9].*


### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try all possible splits, picking i digits from nums1 and k-i from nums2 (for all valid i), and combine each option.
    - From each array, generate all possible subsequences — but that's exponential.
- **Key Optimization:**  
    - For each valid split (i from max(0, k - n) to min(k, m)) choose the max subsequence of length i from nums1 and k-i from nums2 efficiently.
    - Use a **greedy stack approach** to extract the largest subsequence of a given length from a single array efficiently:
        - Iterate, and for each digit, if it is better than what’s on top of the stack and you still have enough remaining digits, pop.
        - Push until the stack is at the required length.
    - **Merge** the two subsequences in a way that always takes the greater digit if a "tie" appears (lexicographically greater).
    - Track the maximum result of all merges.
- **Why this works/tradeoffs:**  
    - This leverages the greedy property of forming the largest number using stacks for the "drop" operation and uses merging that compares suffixes lexicographically.  
    - We only do as many splits as possible ways to distribute k digits between the arrays, each step in linear time.

### Corner cases to consider  
- One or both arrays are empty.
- k is greater than or equal to total number of digits.
- All digits the same.
- Arrays with leading zeros.
- k = 1 (pick the single max digit).
- k = len(nums1) + len(nums2) (take all digits, just merge).

### Solution

```python
def maxNumber(nums1, nums2, k):
    # Helper to get the largest subsequence of length t from a single array
    def maxSubsequence(nums, t):
        stack = []
        drop = len(nums) - t
        for num in nums:
            # If current digit > last, and we can still drop
            while drop and stack and stack[-1] < num:
                stack.pop()
                drop -= 1
            stack.append(num)
        return stack[:t]

    # Helper to merge two lists into the largest possible number
    def merge(seq1, seq2):
        res = []
        # When numbers are equal, compare the remainder of both arrays
        while seq1 or seq2:
            if seq1 > seq2:
                res.append(seq1.pop(0))
            else:
                res.append(seq2.pop(0))
        return res

    m, n = len(nums1), len(nums2)
    result = []
    # Try all possible splits: i from max(0, k-n) to min(k, m)
    for i in range(max(0, k - n), min(k, m) + 1):
        subseq1 = maxSubsequence(nums1, i)
        subseq2 = maxSubsequence(nums2, k - i)
        merged = merge(subseq1[:], subseq2[:])  # [:] for clean pop(0)
        if merged > result:
            result = merged
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - For each split (max m + n cases), extracting subsequences is O(m) and O(n).  
    - Merging is O(k).  
    - So, overall O((m+n)² \* k).
- **Space Complexity:**  
    - O(k) to store temporary subsequences and the result.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you further optimize for very large sequences?
  *Hint: Think about avoiding repeated work by caching or using double-ended queues for the subsequence search.*

- Can you generalize this algorithm to more than two arrays?
  *Hint: What changes for the merge step?*

- What if instead of digits, the arrays contained characters or arbitrary comparable objects?
  *Hint: Does the logic still hold?*

### Summary
This problem uses a **greedy stack** pattern to extract the maximum subsequence from an array, combined with a **lexicographical merge** routine. Core skills include array manipulation, greedy choices, and "two subsequence merge." This approach and these patterns appear in many competitive programming problems involving ordering or selection of elements with constraints on their positions.

### Tags
Array(#array), Two Pointers(#two-pointers), Stack(#stack), Greedy(#greedy), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Remove K Digits(remove-k-digits) (Medium)
- Maximum Swap(maximum-swap) (Medium)