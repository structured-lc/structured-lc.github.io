### Leetcode 3395 (Hard): Subsequences with a Unique Middle Mode I [Practice](https://leetcode.com/problems/subsequences-with-a-unique-middle-mode-i)

### Description  
Given an integer array `nums`, count the number of *subsequences* of size 5 where the middle element (3ʳᵈ position of the subsequence, 0-based) is the *unique mode*—that is, it appears more times than any other number in the subsequence, and this greatest frequency occurs only for the middle number. Return the answer modulo 10⁹+7.

A *subsequence* is not necessarily contiguous, but the elements must maintain their original order.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,1,1,1]`  
Output: `6`  
*Explanation: There are 6 ways to choose 5 out of 6 elements, and every resulting subsequence is [1,1,1,1,1] with 1 as the unique middle mode.*

**Example 2:**  
Input: `nums = [1,2,2,3,3,4]`  
Output: `4`  
*Explanation: Valid subsequences are [1,2,2,3,4] and [1,2,3,3,4], starting at different positions. In each, the middle (third) number is 2 or 3, which is the unique mode in the window.*

**Example 3:**  
Input: `nums = [0,1,2,3,4,5,6,7,8]`  
Output: `0`  
*Explanation: No subsequence of length 5 exists with any number repeated often enough to be the unique mode in the middle.*

### Thought Process (as if you’re the interviewee)  
- First, brute-force: Generate every possible 5-element subsequence, count frequency for each, check if the middle value is a unique mode. But the number of subsequences is C(n,5), n up to 1000, so that's nearly 8*10⁹. Too slow.
- We need to optimize. For each possible choice of the middle element (at position i, 2 ≤ i ≤ n-3), count how many ways to pick 2 elements before i and 2 after, such that the middle is the unique mode in the window. For efficiency, pre-calculate combinations of elements on each side.
- The key: For each index i, try all combinations for picking 2 before and 2 after i, and for each, check the counts of each number. We only increase the counter if the iᵗʰ element appears more than any other, and no tie.
- Since most elements are unique or appear just once, we need to limit the price paid on the step where we check the maximum frequency.
- Final approach: For each i (middle), count ways to pick two elements before i (let's call their numbers a and b) and two after i (c and d), such that number at i has higher frequency than any number among [a, b, c, d]. Use hash counting and prefix/suffix maps to count occurrences and avoid overcounting.

### Corner cases to consider  
- All elements the same.
- All unique elements.
- Array length exactly 5.
- Middle element is not unique mode due to tie.
- Multiple possible numbers for left/right elements matching middle.
- Negative or large numbers.

### Solution

```python
MOD = 10**9 + 7

def count_unique_middle_mode_subsequences(nums):
    from collections import defaultdict

    n = len(nums)
    ans = 0

    # Build prefix_counts: for each position, how many times each number appeared so far
    prefix_counts = [defaultdict(int) for _ in range(n)]
    current = defaultdict(int)
    for i in range(n):
        current[nums[i]] += 1
        prefix_counts[i] = current.copy()

    # Suffix: same for after position
    suffix_counts = [defaultdict(int) for _ in range(n)]
    current = defaultdict(int)
    for i in range(n-1, -1, -1):
        current[nums[i]] += 1
        suffix_counts[i] = current.copy()

    for mid in range(2, n-2):
        # For the two elements to the left (choose any pair)
        left_freq = defaultdict(int)
        for i in range(mid):
            left_freq[nums[i]] += 1
        left_pair = defaultdict(int)
        # count pairs (x, y) to the left
        for i in range(mid):
            for j in range(i+1, mid):
                a, b = nums[i], nums[j]
                left_pair[(a, b)] += 1
        
        # For right two elements
        right_freq = defaultdict(int)
        for i in range(mid+1, n):
            right_freq[nums[i]] += 1
        right_pair = defaultdict(int)
        for i in range(mid+1, n):
            for j in range(i+1, n):
                c, d = nums[i], nums[j]
                right_pair[(c, d)] += 1

        # Count how many pairs can be combined with current mid so that middle is unique mode
        count_left = defaultdict(int)
        for (a, b), cnt in left_pair.items():
            # Number of times nums[mid] as a, b
            freq = 0
            if a == nums[mid]:
                freq += 1
            if b == nums[mid]:
                freq += 1
            count_left[freq] += cnt

        count_right = defaultdict(int)
        for (c, d), cnt in right_pair.items():
            freq = 0
            if c == nums[mid]:
                freq += 1
            if d == nums[mid]:
                freq += 1
            count_right[freq] += cnt

        # Try all combinations where left picks nums[mid] k_left times, right picks nums[mid] k_right times
        # Middle will always have at least 1 (from itself)
        for k_left in range(3):  # possible: 0,1,2
            for k_right in range(3):
                total = 1 + k_left + k_right  # total count of nums[mid] in subsequence
                max_other = 2  # any other number can appear at most 2 (picked 2 before and 2 after)
                if total > max_other and total > 2:
                    # To be unique mode, total > any possible count of other element (left+right at most 2)
                    # For safety, need to check if picking k_left, k_right causes any other number to have same freq as nums[mid].
                    ans += count_left[k_left] * count_right[k_right]
                    ans %= MOD

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** Outer loop runs O(n). Preprocessing prefix and suffix counts is O(n). For each mid, generating all left and right pairs is O(n²), so overall O(n³).
- **Space Complexity:** O(n) for prefix/suffix counts and frequency maps. The major cost is O(n²) for storing pairs, which is manageable for n ≤ 1000.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it for window size other than 5, e.g., k?  
  *Hint: Generalize the pairing method for arbitrary window size and count combinations.*

- Can you optimize further to O(n²) or better?  
  *Hint: Precompute frequency maps and possible placements; use combinatorics.*

- How would your approach adapt if numbers can repeat many times?  
  *Hint: Use frequency thresholds and careful counting of positions.*

### Summary
This problem uses a combinatorial counting and hash map approach, leveraging prefix/suffix maps and combinations to avoid generating all subsequences. The pattern is split-window counting with frequency logic, often useful in "count X in all subsequences" problems, especially for fixed-length, non-contiguous windows.


### Flashcard
For each middle position i (2 ≤ i ≤ n−3), count 5-element subsequences where middle element is unique mode; precompute frequencies of elements before/after i.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Combinatorics(#combinatorics)

### Similar Problems
- Subsequences with a Unique Middle Mode II(subsequences-with-a-unique-middle-mode-ii) (Hard)