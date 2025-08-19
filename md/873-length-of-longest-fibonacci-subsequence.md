### Leetcode 873 (Medium): Length of Longest Fibonacci Subsequence [Practice](https://leetcode.com/problems/length-of-longest-fibonacci-subsequence)

### Description  
Given a strictly increasing array of positive integers, find the length of the longest subsequence that is Fibonacci-like. A **Fibonacci-like subsequence** has at least three numbers, and every number (starting from the third) is the sum of the two preceding ones, i.e., arr[k] = arr[i] + arr[j] for consecutive (i, j, k). If no such subsequence exists, return 0.  
A *subsequence* means you can remove elements but cannot change the order.

### Examples  

**Example 1:**  
Input: `[1,2,3,4,5,6,7,8]`  
Output: `5`  
*Explanation: The longest subsequence that is Fibonacci-like is `[1,2,3,5,8]` (since 1+2=3, 2+3=5, 3+5=8).*

**Example 2:**  
Input: `[1,3,7,11,12,14,18]`  
Output: `3`  
*Explanation: The longest Fibonacci-like subsequences are `[1,11,12]`, `[3,11,14]`, or `[7,11,18]` (each forms a 3-length subsequence).*

**Example 3:**  
Input: `[2,4,7,12,19,31,50]`  
Output: `6`  
*Explanation: The subsequence `[2,4,6,10,16,26]` is not present but `[2,4,7,11,18,29]` is not possible. Here, you often only get 3 as max length if sums are not present. Actual max length depends on present sums but often, only smaller subsequences exist.*

### Thought Process (as if you’re the interviewee)  
First, brute force: Try every possible pair as a starting point and look for further elements to continue the sequence. This is extremely inefficient: O(n³) at least.  
A better approach leverages **dynamic programming**:
- For each pair (i, j), try to find previous element k so that arr[k] + arr[i] = arr[j].
- Use a hashmap to quickly check for previous values (`value_to_index`), allowing O(1) lookups to extend subsequences.
- Store the maximum sequence length with DP (e.g., `dp[i][j]` = length of sequence ending with (i, j)).
- For each j, i < j, check if arr[j]-arr[i] exists before index i. If so, dp[i][j] = dp[k][i] + 1; else dp[i][j] = 2 (start a new subsequence).
Trade-off: O(n²) time and space, but very efficient for n up to 1000.

### Corner cases to consider  
- No Fibonacci-like subsequence exists (e.g. input too scattered, so return 0)
- Multiple equally long valid subsequences—should just return the length, not content
- Small arrays (fewer than 3 elements) should return 0
- Arrays with large gaps between numbers
- Arrays where only every other element can be used to make a Fibonacci-like sequence

### Solution

```python
def lenLongestFibSubseq(arr):
    n = len(arr)
    idx = {x: i for i, x in enumerate(arr)}  # Map value to index for O(1) lookups
    dp = {}  # (i, j): length of fib-subsequence ending with arr[i], arr[j]
    max_len = 0
    
    for j in range(n):
        for i in range(j):
            k_val = arr[j] - arr[i]
            k = idx.get(k_val, -1)
            # k < i ensures the sequence is increasing and not repeating elements
            if k >= 0 and k < i:
                prev_len = dp.get((k, i), 2)
                cur_len = prev_len + 1
                dp[(i, j)] = cur_len
                max_len = max(max_len, cur_len)
            else:
                dp[(i, j)] = 2  # Minimum sequence length is 2
        
    return max_len if max_len >= 3 else 0  # Sequence must be at least 3 long

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), as every pair (i, j) is checked, and hashmap lookups for k are O(1).
- **Space Complexity:** O(n²), for the DP table that stores pairs (i, j).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct and print the actual subsequence, not just its length?  
  *Hint: Track parent links, not just lengths, in DP to backtrack sequence.*

- What if the numbers are not strictly increasing?  
  *Hint: We must use sets/multisets for possible element lookup and handle duplicates carefully.*

- How would your algorithm change if negative numbers or zeros were allowed?  
  *Hint: Manage negative values in the lookup map and don’t assume monotonicity.*

### Summary
This problem uses the **dynamic programming on pairs** pattern, commonly applied in problems like finding arithmetic/geometric sequences or longest increasing subsequence variants. The key optimization is using a hashmap for O(1) lookups and updating based on subsequence extension, rather than recomputing from scratch for each new pair. This pattern is powerful in any problem involving sequence formation based on a relational property between elements.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Fibonacci Number(fibonacci-number) (Easy)