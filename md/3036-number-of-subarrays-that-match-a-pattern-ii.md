### Leetcode 3036 (Hard): Number of Subarrays That Match a Pattern II [Practice](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-ii)

### Description  
Given an array **nums** and a **pattern** array consisting of only -1, 0, and 1, return the number of contiguous subarrays of **nums** of size *(m+1)* (where *m* = len(pattern)) such that, for each k (0 ≤ k < m):
- If pattern[k] == 1, then nums[i + k + 1] > nums[i + k]
- If pattern[k] == 0, then nums[i + k + 1] == nums[i + k]
- If pattern[k] == -1, then nums[i + k + 1] < nums[i + k]

Effectively, check all subarrays of size *(m+1)*; each must match the pairwise comparisons described by pattern.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5,6], pattern = [1,1]`  
Output: `4`  
*Explanation: The pattern [1,1] means: each number is strictly larger than the previous one (strictly increasing), so we look for subarrays of size 3 ([1,2,3], [2,3,4], [3,4,5], [4,5,6]) that are strictly increasing. There are 4 such subarrays.*

**Example 2:**  
Input: `nums = [1,4,4,1,3,5,5,3], pattern = [1,0,-1]`  
Output: `2`  
*Explanation: The pattern [1,0,-1] means: increase, then equals, then decrease. Valid subarrays of size 4: [1,4,4,1] (1→4 (1), 4→4 (0), 4→1 (-1)) and [3,5,5,3] (3→5 (1), 5→5 (0), 5→3 (-1)). Thus, count is 2.*

**Example 3:**  
Input: `nums = [3,3,3,3], pattern = [0,0,0]`  
Output: `1`  
*Explanation: The only subarray of size 4 is [3,3,3,3], which matches three adjacent equality (0,0,0), so answer is 1.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force**: For each starting index `i` from 0 to n - (m + 1), check if the subarray nums[i : i + m + 1] matches the pattern by checking all the pairwise relationships (needs O((n - m) × m) time).
- **Optimized Approach**: 
  - Since only the "pattern" of relationships between consecutive elements matter (is next >, =, or < prev?), first transform nums into a "diff" array where each entry represents the comparison as 1, 0, or -1.
  - Now, finding matching subarrays is reduced to counting the number of occurrences of pattern as a contiguous subarray in the "diffs" array.
  - This is classic string matching; we can use the Knuth–Morris–Pratt (KMP) algorithm to search efficiently for pattern occurrences in the diffs array.
  - KMP runs in O(n + m) time, much faster than O((n-m)*m) for large inputs.
- **Trade-offs**: KMP is slightly more complicated to code but gives you linear time. Since brute force can TLE, KMP is preferred for big n/m.

### Corner cases to consider  
- Empty nums or empty pattern (should return 0)
- Pattern longer than nums (no valid subarrays)
- nums with all equal elements, pattern with only 0s
- nums with strictly increasing/decreasing numbers, pattern with all 1s/-1s
- Multiple overlaps or back-to-back matches
- Negative numbers and zeros in nums

### Solution

```python
def countMatchingSubarrays(nums, pattern):
    # Step 1: Compute the diffs array representing relative relationship between consecutive elements
    diffs = []
    for i in range(1, len(nums)):
        if nums[i] > nums[i-1]:
            diffs.append(1)
        elif nums[i] == nums[i-1]:
            diffs.append(0)
        else:
            diffs.append(-1)
    # Step 2: Build the prefix table (pi) for the pattern -- standard KMP preprocessing
    def compute_pi(pat):
        pi = [0] * len(pat)
        j = 0
        for i in range(1, len(pat)):
            while j > 0 and pat[i] != pat[j]:
                j = pi[j-1]
            if pat[i] == pat[j]:
                j += 1
            pi[i] = j
        return pi
    pi = compute_pi(pattern)
    # Step 3: KMP search for pattern in diffs
    res = 0
    j = 0
    for i in range(len(diffs)):
        while j > 0 and diffs[i] != pattern[j]:
            j = pi[j-1]
        if diffs[i] == pattern[j]:
            j += 1
        if j == len(pattern):
            res += 1
            j = pi[j-1]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m). 
  - O(n) to build `diffs` (n = len(nums))
  - O(m) to build the prefix array (m = len(pattern))
  - O(n) for the KMP search step.
- **Space Complexity:** O(n) for `diffs`, O(m) for the prefix array. Total is O(n + m); extra storage is linear.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your code if pattern could contain values other than -1, 0, 1?  
  *Hint: You'd need to change how you compare elements and possibly generalize the mapping.*

- Can this approach be adapted for overlapping vs non-overlapping matches?  
  *Hint: KMP matches overlapping by default; to avoid, advance the search pointer accordingly after a match.*

- What if you want to also return the starting indices of each matching subarray, not just the count?  
  *Hint: Store the index `i` each time j == len(pattern) in the KMP loop.*

### Summary
This problem demonstrates an application of **"string search / KMP"** on transformed numeric arrays, where adjacent differences are mapped to small categorical values. Transforming the problem to subarray "pattern matching" and using efficient substring search is a common technique, useful in DNA matching, plagiarism detection, and time-series motif search. The coding pattern is efficient search via pre-processing (KMP), and learning this is helpful in many advanced array/string matching scenarios.