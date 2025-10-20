### Leetcode 2055 (Medium): Plates Between Candles [Practice](https://leetcode.com/problems/plates-between-candles)

### Description  
You are given:
- A string **s**, only containing:
  - `'*'`: represents a plate.
  - `'|'`: represents a candle.
- A list of queries, where each query `[left, right]` asks: "In the substring s[left…right] (inclusive), how many plates are *between* two candles?"  
A plate is 'between candles' if, in the substring, there is at least one candle both *before* and *after* it.

For each query, return the number of plates between the leftmost and rightmost candle found within the query range. If there are no two candles, output 0 for that query.

### Examples  

**Example 1:**  
Input:  
s = `"**|**|***|"`,  
queries = `[[2,5],[5,9]]`  
Output:  
`[2,3]`  
*Explanation:  
For query [2,5] → substring is "|**|", candles at 2 and 5, plates between at 3,4 → 2 plates.  
For query [5,9] → substring is "|***|", candles at 5 and 9, plates at 6,7,8 → 3 plates.*

**Example 2:**  
Input:  
s = `"***|**|*****|**||**|*"`,  
queries = `[[1,17],[4,5],[14,17],[5,11],[15,16]]`  
Output:  
`[9,0,0,0,0]`  
*Explanation:  
For [1,17]: substring includes multiple candles; only the plates between the *first* and *last* candle in [1,17] count.  
Other queries do not have two candles, so output is 0 for them.*

**Example 3:**  
Input:  
s = `"|*|*|"`  
queries = `[[0,4],[1,3]]`  
Output:  
`[2,0]`  
*Explanation:  
[0,4]: substring is "|*|*|", candles at indices 0,2,4; plates at 1 and 3. Plates 1 and 3 are between candles (between 0–2 and 2–4). Total 2.  
[1,3]: only one candle in substring, so output is 0.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** For each query, scan substring s[left…right], find all plates with a candle to their left and right. Very slow: O(q × n) for q queries of up to n length.

- **Optimizing:**  
  - Precompute for the entire string:
    - **Prefix sum** of plates: at position i, how many plates from the left up to i.
    - For each position:
      - nearest candle to left (or at i)
      - nearest candle to right (or at i)
  - For a query [l,r]:
    - Find nearest candle to right at or after l → lCandle
    - Find nearest candle to left at or before r → rCandle
    - If lCandle ≥ rCandle: output 0 (not enough candles to span)
    - Else, result = plates_prefix[rCandle] - plates_prefix[lCandle]
  - This gives O(n) pre-processing, O(1) per query.

**Why this approach?**  
- Fast: preprocesses once, queries are instant.
- Pattern: Prefix sums + precomputed "nearest neighbor" arrays, similar to "Range Sum Query" and "Next Greater Element" patterns.

### Corner cases to consider  
- No candles at all in substring: always 0.
- Only one candle in substring: always 0.
- Plates at the edge, but not between two candles: should not count.
- Overlapping or identical queries.
- Edge indices (l or r at edges of s).
- Empty substring (l > r).
- All plates or all candles.

### Solution

```python
def platesBetweenCandles(s, queries):
    n = len(s)
    # Precompute prefix sum of plates
    plates_prefix = [0] * (n + 1)
    for i in range(n):
        plates_prefix[i + 1] = plates_prefix[i] + (1 if s[i] == '*' else 0)

    # Precompute nearest left candle at or before i
    nearest_left = [-1] * n
    last_candle = -1
    for i in range(n):
        if s[i] == '|':
            last_candle = i
        nearest_left[i] = last_candle

    # Precompute nearest right candle at or after i
    nearest_right = [-1] * n
    last_candle = -1
    for i in range(n - 1, -1, -1):
        if s[i] == '|':
            last_candle = i
        nearest_right[i] = last_candle

    res = []
    for left, right in queries:
        # Find first candle at or after left
        lCandle = nearest_right[left]
        # Find last candle at or before right
        rCandle = nearest_left[right]
        if lCandle == -1 or rCandle == -1 or lCandle >= rCandle:
            res.append(0)
        else:
            cnt = plates_prefix[rCandle] - plates_prefix[lCandle]
            res.append(cnt)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing prefix sums and nearest neighbor arrays: O(n).
  - Each query: O(1).
  - For q queries: O(n + q).
- **Space Complexity:**  
  - O(n) for prefix sum and two nearest arrays.
  - O(q) for output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string is extremely large (e.g., 10⁸), but queries are small and localized?
  *Hint: Could you preprocess only lazily around queried regions, or use segment trees/range query data structures?*

- Can you support real-time updates in the string, e.g., flipping a plate to candle or vice versa?
  *Hint: What kind of range queries and updates are efficient? Think Binary Indexed Tree (Fenwick Tree) or Segment Tree.*

- Can we generalize to arbitrary characters as delimiters instead of only '|' and '*'?
  *Hint: Abstract the idea of "delimiter event" and generic counting, possibly with a dictionary mapping.*

### Summary
This problem is a textbook example of the "prefix sum + nearest neighbor/marker index" pattern for handling range queries with precomputed auxiliary arrays. It's a common technique for substring/range counting problems where the answer depends on boundary features (“candle” as delimiter). Similar patterns show up in histogram queries, substring boundary finding, and event-interval counting problems.


### Flashcard
Precompute prefix sums and nearest candles for efficient query processing.

### Tags
Array(#array), String(#string), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
- Find First and Last Position of Element in Sorted Array(find-first-and-last-position-of-element-in-sorted-array) (Medium)
- Can Make Palindrome from Substring(can-make-palindrome-from-substring) (Medium)