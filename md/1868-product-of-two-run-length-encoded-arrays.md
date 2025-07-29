### Leetcode 1868 (Medium): Product of Two Run-Length Encoded Arrays [Practice](https://leetcode.com/problems/product-of-two-run-length-encoded-arrays)

### Description  
You are given two **run-length encoded arrays**: `encoded1` and `encoded2`.  
Each entry `[val, freq]` means you should expand this segment to form an array by repeating `val` `freq` times. For example, `[[3,2],[2,3]]` decodes to `[3,3,2,2,2]`.  
Both `encoded1` and `encoded2` decode to arrays of the **same length**.  
Return the **element-wise product** of the decoded arrays, but encode the result using **run-length encoding** again — merging neighboring segments if the product is the same.

### Examples  

**Example 1:**  
Input: `encoded1 = [[1,3],[2,1]]`, `encoded2 = [[6,2],[3,2]]`  
Output: `[[6,2],[3,1],[6,1]]`  
Explanation:  
- Decode both: `[1,1,1,2]` and `[6,6,3,3]`  
- Element-wise: `[1×6, 1×6, 1×3, 2×3] = [6,6,3,6]`  
- Merge: two `6`, then one `3`, then one `6` → `[[6,2],[3,1],[6,1]]`

**Example 2:**  
Input: `encoded1 = [[2,1],[3,2],[2,1]]`, `encoded2 = [[3,3],[2,1]]`  
Output: `[[6,1],[9,2],[4,1]]`  
Explanation:  
- Decode: `[2,3,3,2]` and `[3,3,3,2]`  
- Element-wise: `2×3=6`, `3×3=9`, `3×3=9`, `2×2=4`  
- Run length encoded: `[[6,1],[9,2],[4,1]]`

**Example 3:**  
Input: `encoded1 = [[1,5]]`, `encoded2 = [[2,5]]`  
Output: `[[2,5]]`  
Explanation:  
- Decode: `[1,1,1,1,1]` and `[2,2,2,2,2]`
- Element-wise: `[2,2,2,2,2]`  
- Run length encoded: `[[2,5]]`

### Thought Process (as if you’re the interviewee)  
Let’s start with the brute-force idea:  
- Fully **expand** both encoded arrays to their flat form, do pairwise multiplication, then ***run-length encode*** the result again.
- But expanding might use a lot of extra space for large arrays. Instead, notice their structure: Each segment is `[val, freq]` in each encoding.
- Use **two pointers** (`i` for `encoded1`, `j` for `encoded2`). Find the minimum of the frequencies at the current segments (`min_f = min(freq1, freq2)`).  
- Multiply `val1 * val2`, and record `[val1 * val2, min_f]` to result.  
- Decrement both current frequencies by `min_f`. If either frequency is exhausted, move that pointer to the next segment.
- Whenever the just-added product equals the last added product (in result), merge by incrementing its frequency.

This approach is optimal because you never fully expand the arrays and process each element only once. The main trade-off is a bit of careful index and frequency management, but space is minimized.

### Corner cases to consider  
- Empty encoded arrays (though the problem guarantees same length, so likely not needed)
- Overlapping segments: products that are the same in a row and must merge
- Large frequency segments (test proper pointer increment and merging)
- Output array with only a single repeated product
- Segments across both arrays aligning at different points

### Solution

```python
def findRLEArray(encoded1, encoded2):
    res = []
    i, j = 0, 0  # pointers for encoded1 and encoded2
    freq1, freq2 = encoded1[0][1], encoded2[0][1]
    while i < len(encoded1) and j < len(encoded2):
        # Find overlap length
        min_f = min(freq1, freq2)
        product = encoded1[i][0] * encoded2[j][0]
        # Merge with previous if product is the same
        if res and res[-1][0] == product:
            res[-1][1] += min_f
        else:
            res.append([product, min_f])
        # Update lightest segment's freq and move pointers
        freq1 -= min_f
        freq2 -= min_f
        if freq1 == 0:
            i += 1
            if i < len(encoded1):
                freq1 = encoded1[i][1]
        if freq2 == 0:
            j += 1
            if j < len(encoded2):
                freq2 = encoded2[j][1]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N, M are the number of segments in each input (not the expanded array size). Each segment’s frequency is reduced and processed once, and pointers move forward after exhausting segments.
- **Space Complexity:** O(L), where L is the number of segments in the output encoded product. No extra space is used for full array expansions.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case when the input encodings represent arrays of *different* lengths?  
  *Hint: Think about how the decoding would align, and what to do with leftover items from the longer array.*

- Can you support N-way run-length multiplication (arrays from three or more encodings)?  
  *Hint: Generalize your two-pointer technique for multiple pointers/frequency reductions.*

- How would you efficiently handle streaming or very large encoding arrays that don't fit in memory?  
  *Hint: Can you process segment by segment, possibly yielding intermediate output?*

### Summary
This problem uses the **two pointer** and **run-length merge** pattern: process segment-by-segment by advancing frequency counts, always minimizing expansion. This pattern is common in problems involving **compressed/encoded representations**, and is closely related to tasks in video encoding, image RLE, and large-scale streaming data processing where you can’t expand the data in memory.