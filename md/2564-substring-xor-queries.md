### Leetcode 2564 (Medium): Substring XOR Queries [Practice](https://leetcode.com/problems/substring-xor-queries)

### Description  
Given a binary string **s** and a list of queries where each query is a pair `[first, second]`, for each query you must find the shortest substring inside **s** whose decimal value `val` satisfies:  
`val ^ first = second`  
Return the **0-indexed** range `[l, r]` of such a substring. If multiple answers exist, return the one with the smallest left index. If none exist, return `[-1, -1]`.  

A substring here means a contiguous sequence of bits within **s**.

### Examples  

**Example 1:**  
Input: `s = "101101", queries = [[0,5],[1,2]]`  
Output: `[[0,2],[2,3]]`  
*Explanation:*  
- For the first query, 0^5 = 5. The binary "101" (from index 0 to 2) is 5.  
- For the second query, 1^2 = 3. The binary "11" (from index 2 to 3) is 3.

**Example 2:**  
Input: `s = "0101", queries = [[12,8]]`  
Output: `[[-1,-1]]`  
*Explanation:*  
- For the query 12^8 = 4. There is no substring of s whose value is 4, so return [-1,-1].

**Example 3:**  
Input: `s = "1", queries = [[0,1],[1,0]]`  
Output: `[[0,0],[0,0]]`  
*Explanation:*  
- 0^1=1. The only substring “1” at index 0.  
- 1^0=1. Same substring.

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:** For each query, generate all substrings of s, convert each to decimal, check the XOR equation (`val ^ first == second`). This is O(n²) per query, resulting in a huge time complexity.

- **Can we preprocess?**  
  Since the queries only change the input pair and not the string, preprocess all possible substrings (of reasonable length) of **s**. For each substring, store its decimal value and its [l, r] position.  
  For each query, we need a substring with value `val = first ^ second`. With a map from value → [l, r], answer is immediate.

- **Optimization details:**  
  - With 10⁹ upper bound for inputs, 32 bits are sufficient (since any integer in [0, 2³²)). So we only need to consider substrings up to length 32 (leading zeros allowed).
  - For each i, explore substrings s[i:j] for up to 32 positions ahead, convert to int, store minimum [l, r] for each value.
  - For each query, just lookup value.

- **Tradeoffs:**  
  Preprocessing costs O(n × 32) = O(n), as each starting position only considers substrings up to length 32. Query answer is O(1).

### Corner cases to consider  
- Single character string, like "0" or "1".
- All zeros substring ("00000").
- Substring value is 0 (must handle leading zeros correctly).
- Multiple substrings can match; pick the one with smallest l.
- No matching substring exists.
- Queries where first = second, so val = 0.
- Large input with many queries.

### Solution

```python
def substringXorQueries(s, queries):
    # Preprocess: For each possible substring value of length <= 32,
    # store its first [start, end] position.
    value_to_indices = dict()
    n = len(s)
    for i in range(n):
        # Skip leading zeroes if s[i] == '0', but still process single '0'
        if s[i] == '0':
            if 0 not in value_to_indices:
                value_to_indices[0] = [i, i]
            continue

        x = 0
        # Only consider up to 32 bits to fit within integer range
        for j in range(i, min(i + 32, n)):
            x = (x << 1) | (ord(s[j]) - ord('0'))
            if x not in value_to_indices:
                value_to_indices[x] = [i, j]

    result = []
    for first, second in queries:
        val = first ^ second
        if val in value_to_indices:
            result.append(value_to_indices[val])
        else:
            result.append([-1, -1])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) for preprocessing, where each of n positions explores up to 32 substrings.  
  Each query is O(1).  
  Total: O(n + q), where q = number of queries.

- **Space Complexity:**  
  O(n) for the dictionary mapping value to indices. Number of unique substrings of length ≤ 32 is at most O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle higher base strings (not just binary)?
  *Hint: How do you convert a substring to an integer in arbitrary base efficiently?*

- What if queries ask for the longest instead of the shortest substring?
  *Hint: You’d need to store all possible occurrences, not just the earliest per value.*

- Suppose s is very long (10⁶ or more), but queries are few?  
  *Hint: Is on-the-fly processing per query ever justified?*

### Summary
This problem leverages **preprocessing with a hash map** to allow constant-time query answering. The pattern is similar to substring hash mapping and conversion, common in substring search and rolling hash problems. Careful attention to substring length (due to value limits) is the key insight. This approach generalizes to various substring lookup problems with value constraints, especially when string length is moderate and many queries are expected.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation)

### Similar Problems
- String Matching in an Array(string-matching-in-an-array) (Easy)