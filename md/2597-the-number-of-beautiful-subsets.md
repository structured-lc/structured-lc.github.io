### Leetcode 2597 (Medium): The Number of Beautiful Subsets [Practice](https://leetcode.com/problems/the-number-of-beautiful-subsets)

### Description  
Given an array of positive integers `nums` and a positive integer `k`, find the number of non-empty **beautiful subsets** of `nums`.  
A subset is **beautiful** if it does **not** contain two integers with an absolute difference equal to `k`.  
Return the number of non-empty beautiful subsets that can be formed from `nums`.

For example:  
If `nums = [2,4,6]` and `k = 2`, subsets like `[2,4]` or `[4,6]` are **not beautiful** (because `|2-4|=2`), but `[2,6]` is beautiful.

### Examples  

**Example 1:**  
Input: `nums = [2,4,6], k = 2`  
Output: `4`  
*Explanation: The beautiful subsets are: [2], [4], , [2,6].  
Subsets like [2,4], [4,6], [2,4,6] are not beautiful because they have elements with difference = 2.*

**Example 2:**  
Input: `nums = [1], k = 1`  
Output: `1`  
*Explanation: The only non-empty subset is [1], and it's beautiful.*

**Example 3:**  
Input: `nums = [1,2,3], k = 1`  
Output: `4`  
*Explanation: Beautiful subsets: [1], [2], [3], [1,3].  
Subsets like [1,2], [2,3], [1,2,3] are not beautiful because |1-2|=1 or |2-3|=1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible subsets except the empty set. For each, check if every pair of elements avoids the absolute difference `k`. There are 2ⁿ - 1 subsets, but for each subset we could take O(n) checks, leading to O(n × 2ⁿ) time.
- **Better way:** We need to efficiently avoid forming subsets that violate the difference condition. Backtracking fits:  
   - For each number, we decide to either pick or not pick it.  
   - If we pick it, ensure neither `num - k` nor `num + k` is already included (as their presence would violate the rule).  
   - Use a hash map (`counts` of chosen numbers) to track what's currently in the subset.  
   - Every time we reach the end, we count only the non-empty subsets.

- **Why this approach?**  
   - Backtracking cleanly explores the solution tree.  
   - Hash map lets us quickly check if a forbidden difference would occur by including/excluding a number.  
   - Time is O(n × 2ⁿ) in the worst case, but for small n this is reasonable.

### Corner cases to consider  
- Empty array: No subsets possible.
- All elements are unique and `k` is larger than any difference: Every non-empty subset is beautiful.
- All elements the same, and `k=0`: Only singleton subsets are beautiful.
- One element: Only possible subset is the singleton.
- Large input size, but small `k`: Could be many forbidden combinations.

### Solution

```python
from collections import defaultdict

def beautifulSubsets(nums, k):
    # Helper function: dfs with index and current counts of used numbers.
    def dfs(idx, counts):
        if idx == len(nums):
            # 1 for the empty set; we'll remove it at the end
            return 1
        # Option 1: don't take nums[idx]
        total = dfs(idx + 1, counts)
        # Option 2: take nums[idx] if no forbidden value present
        v = nums[idx]
        if counts[v - k] == 0 and counts[v + k] == 0:
            counts[v] += 1
            total += dfs(idx + 1, counts)
            counts[v] -= 1
        return total

    nums.sort()  # Sorting helps group same values and makes skips more deterministic
    counts = defaultdict(int)
    # Subtract 1 to exclude the empty set
    return dfs(0, counts) - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 2ⁿ)  
  For each index, both choices (pick or skip), leading to a search tree of up to 2ⁿ leaves. Each recursive call is O(1) (due to efficient hash map checks), but total calls are O(2ⁿ).
- **Space Complexity:** O(n)  
  The recursion stack goes as deep as n, and the `counts` dict at most size n with unique nums.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose `nums` contains duplicates. How does the algorithm handle them?  
  *Hint: What happens if two numbers are equal and both are available for inclusion?*

- If k = 0, what is a beautiful subset?  
  *Hint: What does the forbidden difference mean if it's zero?*

- How would you optimize if n is large (e.g. n > 30)?  
  *Hint: Could grouping, dynamic programming, or bitmasking help based on number constraints?*

### Summary
This problem is a classic case of **backtracking with state pruning**, leveraging a hash map to prevent illegal pairings during subset formation.  
The coding pattern is common for subset/combination problems with "forbidden" conditions and decision trees, and can be applied to other problems such as subset sum with forbidden elements, or independent sets in graphs.


### Flashcard
Backtracking with memoization: for each number, decide include/exclude; skip if including violates the difference-k constraint.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Sorting(#sorting), Combinatorics(#combinatorics)

### Similar Problems
- Construct the Lexicographically Largest Valid Sequence(construct-the-lexicographically-largest-valid-sequence) (Medium)