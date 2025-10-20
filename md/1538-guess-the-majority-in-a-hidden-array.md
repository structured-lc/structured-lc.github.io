### Leetcode 1538 (Medium): Guess the Majority in a Hidden Array [Practice](https://leetcode.com/problems/guess-the-majority-in-a-hidden-array)

### Description  
Given a hidden array `nums` containing only 0s and 1s, you are not allowed to access the array directly. Instead, you interact via an `ArrayReader` API, which allows two functions:
- `reader.query(a, b, c, d)`: Given four distinct indices, returns:
    - 4 if all four values are the same.
    - 2 if three are the same and one differs.
    - 0 for a 2-2 split.
- `reader.length()`: Gives the length of the array.

Your goal is to return the index of **any** majority element (an element with the most frequent value). If 0s and 1s are equally frequent (i.e., a tie), return -1.

### Examples  

**Example 1:**  
Input: `nums=[0,0,1,0,1,1,1,1]`  
Output: `5`  
Explanation:  
reader.length() → 8  
reader.query(0,1,2,3) → 2 (“three are same, one differs”).  
reader.query(4,5,6,7) → 4 (“all the same”).  
There are more 1s than 0s, any index of those 1s (4, 5, 6, 7) can be returned.

**Example 2:**  
Input: `nums=[0,0,1,1,0]`  
Output: `0`  
Explanation:  
Possible outputs are the indices of any majority value (0 here).

**Example 3:**  
Input: `nums=[1,0,1,0,1,0,1,0]`  
Output: `-1`  
Explanation:  
There are 4 zeros and 4 ones—a tie—so output is -1.

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  Since we can’t see the elements, we’d consider comparing all groups of 4, but this would be inefficient and redundant for large arrays.

- **Optimal approach:**  
  Use a baseline with the first four elements: query sets involving these plus a fifth element in turn, and observe how frequently the result matches or differs.  
  The key insight:  
  - Fix the baseline (say, [0,1,2,3]).
  - Iterate through the rest (`i=4` to `n-1`), each time choosing indices (among 0..3 and i) to form four.
  - If `query(0,1,2, i)` differs from the initial, that means `nums[i]` is different from most of the baseline.
  - Count how many elements match or differ from the baseline; at the end, report a matching index if it’s the majority, else the other type if that’s the majority; otherwise -1 if tied.

- **Why choose this?**  
  - It’s O(n) queries.
  - No need to reconstruct the entire array.
  - This pattern is robust, even with very large input sizes.

### Corner cases to consider  
- Array of length exactly 5 (minimum).
- All elements are the same (all 0s or all 1s).
- The array is exactly balanced (tie case).
- Any tie among more complex arrays.
- Output can be any valid index of a majority.

### Solution

```python
# 'reader' is an instance of ArrayReader
# Do not use python libraries to shortcut logic.

def guessMajority(reader):
    n = reader.length()

    # Query initial four indices as baseline
    base_query = reader.query(0, 1, 2, 3)

    # We'll count how many indices match index 0
    count_same, count_diff = 1, 0    # index 0 is our source-of-truth
    idx_diff = -1    # store one index that doesn't match index 0

    # Compare index 4 separately (since indices for query must be distinct)
    for i in range(4, n):
        # query indices: pick three among 0-3, and the new one, 'i'
        # To compare i with index 0, query (1,2,3,i)
        q = reader.query(1, 2, 3, i)
        # If the value equals base_query, then i matches index 0 value
        if q == base_query:
            count_same += 1
        else:
            count_diff += 1
            idx_diff = i

    # Also compare indices 1, 2, 3 relative to index 0
    for k in range(1, 4):
        arr = [i for i in range(4) if i != k]
        # arr contains three indices from {0,1,2,3} excluding k
        q = reader.query(arr[0], arr[1], arr[2], 4) if n > 4 else base_query
        # If this query matches base_query, then index k is same as index 0 value
        if q == base_query:
            count_same += 1
        else:
            count_diff += 1
            idx_diff = k

    # Final decision
    if count_same > count_diff:
        return 0      # index 0 is in majority group
    elif count_diff > count_same:
        return idx_diff     # any differing index will do
    else:
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  One query per element (n-4), and three extra for indices 1–3.
- **Space Complexity:** O(1)  
  Only a handful of integer counters and indices. No extra arrays or recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the API allowed you to query fewer or more than 4 elements at a time?  
  *Hint: Consider how parity and splitting logic could extend or generalize.*

- Can you determine all indices of the majority value efficiently?  
  *Hint: You have already recorded which indices match index 0's value.*

- How would you adjust the solution if the array allowed more than two distinct values?  
  *Hint: The problem then reduces to a "plurality" or "mode" question, which may require more queries or different logic.*

### Summary
This approach uses the **comparison/query baseline** pattern: set a reference group, then compare remaining unknowns to it via queries. 
The technique is similar to majority element finding (Boyer-Moore voting), except with queried side information instead of direct access. This pattern (divide and compare via indirect queries) is often found in interactive problems, and is robust to constraints where information is limited to group-wise observations or indirect evidence.


### Flashcard
Establish a baseline and iteratively query sets to deduce the majority element in a hidden array.

### Tags
Array(#array), Math(#math), Interactive(#interactive)

### Similar Problems
