### Leetcode 274 (Medium): H-Index [Practice](https://leetcode.com/problems/h-index)

### Description  
You’re given an array of non-negative integers called `citations`, where each element represents the number of citations for a researcher's individual paper. The **H-index** is defined as the largest number `h` such that the researcher has **at least** `h` papers with **at least** `h` citations each. Your task is to compute this `h`-index.

### Examples  

**Example 1:**  
Input: `citations = [3,0,6,1,5]`  
Output: `3`  
*Explanation: There are 3 papers with at least 3 citations each (3, 6, 5). No higher `h` satisfies the condition.*

**Example 2:**  
Input: `citations = [1,3,1]`  
Output: `1`  
*Explanation: Only 1 paper has at least 1 citation. For higher `h`, too few papers meet the citation threshold.*

**Example 3:**  
Input: `citations = `  
Output: `0`  
*Explanation: No paper has ≥ 1 citation, so `h`-index is 0.*

### Thought Process (as if you’re the interviewee)  
Start with the **brute-force** approach: For all possible `h` from 0 up to n (number of papers), count for each possible `h` how many papers have at least `h` citations. The largest such `h` where count ≥ `h` is the answer.  
However, this requires O(n²) time as we check each `h` for all papers.

To **optimize**, first notice that sorting can help. If we sort the citations in *descending* order, then for each index `i`, the value citations[i] tells us how many citations the (i+1)ᵗʰ most-cited paper has. The largest `h` where citations[h-1] ≥ h gives the answer.

Even more efficiently, after sorting, we can loop from `i=0` to `i=n-1` and look for the last position where citations[i] ≥ i+1, and set answer to i+1.

This is efficient (O(n log n)) and clean to implement, and avoids extra space.  
There’s also a possible O(n) bucket sort approach if citations can be much larger than n, but in practice the sorting approach is usually enough.

### Corner cases to consider  
- All zeros, e.g. `[0,0,0]`
- One element, `[x]`, where x = 0 or x > 0  
- All values are the same
- Increasing or decreasing order  
- Large values (all much bigger than length of list)  
- Empty input array (should not occur per constraints)

### Solution

```python
def hIndex(citations):
    # Sort the citations in descending order
    citations.sort(reverse=True)
    n = len(citations)
    h = 0
    # For each index, check if citations[i] >= i+1
    for i in range(n):
        if citations[i] >= i + 1:
            h = i + 1
        else:
            break
    return h
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting the input is the dominant step; iterating through once is O(n).
- **Space Complexity:** O(1) extra space, if sorting is done in-place (as above), otherwise O(n) for the sorted array if not.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this problem in O(n) time?
  *Hint: Use a counting/bucket approach, leveraging the fact citations greater than n do not affect the result.*
- Can you efficiently compute h-index if citations are *streaming in one by one*?
  *Hint: Think about maintaining a count array on the fly, or using a data structure.*
- How would your method change if papers can have negative citation counts?
  *Hint: The definition assumes non-negative. You'll have to filter or clarify the domain.*

### Summary
This problem uses the **array manipulation and sorting** coding pattern, specifically sorting with a controlled iteration. Recognizing how to map the tricky mathematical definition to sorted order and indexed comparison is key.  
This pattern commonly appears in *selection* or *threshold counting* problems, and is a classic "find the largest k such that..." style seen in rankings, selection, and percentile problems.

### Tags
Array(#array), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
- H-Index II(h-index-ii) (Medium)