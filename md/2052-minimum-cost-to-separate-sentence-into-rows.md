### Leetcode 2052 (Medium): Minimum Cost to Separate Sentence Into Rows [Practice](https://leetcode.com/problems/minimum-cost-to-separate-sentence-into-rows)

### Description  
Given a sentence (string of words separated by single spaces, with no leading or trailing spaces) and an integer k, split the sentence into rows where the number of characters in each row is at most k.  
A word cannot be split across rows. Every word must be used exactly once and in order.  
Each row must not begin or end with spaces, and words in a row are separated by a single space.  
The cost for a row of n characters is (k - n)².  
The total cost is the sum of these costs for every row *except the last*.  
Your task: Insert line breaks to minimize the total cost.

### Examples  

**Example 1:**  
Input: `sentence = "i love leetcode", k = 12`  
Output: `1`  
Explanation:  
- "i love" (length 6), cost = (12-6)² = 36  
- "leetcode" (length 8), cost = 0 (last row ignored)  
Total cost = 36

But a better split:  
- "i love leetc" (12), cost = 0  
- "ode" (3), cost = 0 (last)  
But can't split word "leetcode", so only valid is:  
- "i love" (6), "leetcode" (8): cost 36

If split as:  
- "i" (1), cost = (12-1)² = 121  
- "love" (4), cost = (12-4)² = 64  
- "leetcode" (8), cost = 0  
Total = 185, which is higher.

**Example 2:**  
Input: `sentence = "hello world", k = 11`  
Output: `0`  
Explanation: The whole line "hello world" (length 11) fits in a single row, last row has no cost.

**Example 3:**  
Input: `sentence = "a bb ccc dddd eeeee", k = 6`  
Output: `3`  
Explanation:  
One optimal split:  
- "a bb" (4), cost = (6-4)² = 4  
- "ccc" (3), cost = (6-3)² = 9  
- "dddd" (4), cost = (6-4)² = 4  
- "eeeee" (5), last row, cost ignored  
Total cost = 4+9+4 = 17  
But "a bb", "ccc dddd", "eeeee" -> (4),(8),(5): so must balance grouping for minimal cost.

### Thought Process (as if you’re the interviewee)  
First, brute force: try every possible way of breaking the words into lines, for each possible grouping compute row lengths, and calculate total cost (ignoring cost on the last row). Try all splits and return the minimum cost.

This approach has exponential complexity: for each starting word, try including subsequent words until limit k is exceeded, recursively solve for remainder—leading to T(n) = O(2ⁿ) possibilities.

To optimize, use dynamic programming with memoization: For each starting word, cache the minimal cost to split the remainder. For each position, try packing as many words as possible (while length ≤ k), and recursively compute costs for the rest.

Why this DP works:  
- Each subproblem is uniquely defined by current word index.
- The solution at word i depends only on the cost to split words from i onward.
- Caching subproblems prevents recomputation.

### Corner cases to consider  
- All words together fit a single row (should have cost 0).
- A word longer than k (should be impossible per constraints).
- Very large sentence (requirecing efficient DP).
- All words are 1 letter and k is 1 (each word on its own line, but last row cost is ignored).
- Sentence has just one word.

### Solution

```python
def minimumCost(sentence: str, k: int) -> int:
    # Split the sentence into words
    words = sentence.split()
    n = len(words)
    
    # Memoization for DP
    from functools import lru_cache
    
    @lru_cache(None)
    def dp(i):
        # Base case: No cost for the last row
        if i == n:
            return 0
        
        min_cost = float('inf')
        line_len = 0
        # Try all possible endings for the current row
        for j in range(i, n):
            # Add word length
            line_len += len(words[j])
            # Add space if not the first word in this row
            if j > i:
                line_len += 1
            if line_len > k:
                break
            # Only add cost if not last line
            if j == n-1:
                cost = 0
            else:
                cost = (k - line_len) ** 2
            # Recurse for the rest
            min_cost = min(min_cost, cost + dp(j+1))
        return min_cost
    
    return dp(0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), where n = number of words. For each starting index, we check all (at most n) possible endpoints for a row.  
- **Space Complexity:** O(n) for recursion stack and O(n) for memoization table (since each subproblem depends on start index).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the last row should also count toward the total cost?  
  *Hint: Remove the exclusion condition for the last row in cost calculation.*

- How would you reconstruct the actual line breaks, not just the minimum cost?  
  *Hint: Track the splits along with cost in DP, and recover the breakpoints via parent indices.*

- Could you do this in O(n) time? Under what restrictions or for what cases?  
  *Hint: For all words with length ≤ k and if greedy packing is always optimal, linear pass suffices.*

### Summary
This is a classic **DP partitioning** problem, similar to "Word Break" or text justification. The common pattern is "try all partitions, cache sub-solutions."  
This technique is applicable to many string DP and optimal partitioning problems where grouping decisions are local and cost is combinable, e.g., word wrap, rod-cutting, segment-based scoring, etc.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Sentence Screen Fitting(sentence-screen-fitting) (Medium)