### Leetcode 2343 (Medium): Query Kth Smallest Trimmed Number [Practice](https://leetcode.com/problems/query-kth-smallest-trimmed-number)

### Description  
Given an array **nums** of equal-length digit strings (possibly with leading zeros) and a list of queries, each query is a pair [k, trim].  
For each query:  
- Trim the **rightmost** `trim` digits from every number in **nums** (remove the leftmost digits so each has exactly `trim` digits).
- Find the kᵗʰ smallest **trimmed string** among all numbers (if equal, pick the one with smaller original index).
Return a list of indices (relative to the original **nums**) for the answers to all queries, resetting the trims for each query.

### Examples  

**Example 1:**  
Input:  
`nums = ["102","473","251","814"]`,  
`queries = [[1,1],[2,3],[4,2],[1,2]]`  
Output:  
`[2,2,1,0]`  
*Explanation:*  
- Query [1,1]: Trim last 1 digit → ["2","3","1","4"]. Sorted: [("1",2),("2",0),("3",1),("4",3)]. 1ˢᵗ smallest: index=2.
- Query [2,3]: Trim last 3 digits (whole number) → ["102","473","251","814"]. Sorted: [("102",0),("251",2),("473",1),("814",3)]. 2ⁿᵈ smallest: index=2.
- Query [4,2]: Trim last 2 digits → ["02","73","51","14"]. Sorted: [("02",0),("14",3),("51",2),("73",1)]. 4ᵗʰ smallest: index=1.
- Query [1,2]: Trim last 2 digits → ["02","73","51","14"]. 1ˢᵗ smallest: index=0.

**Example 2:**  
Input:  
`nums = ["24","37","96","04"]`,  
`queries = [[2,1],[2,2]]`  
Output:  
`[3,0]`  
*Explanation:*  
- Query [2,1]: Trim last 1 digit → ["4","7","6","4"]. Sorted: [("4",0),("4",3),("6",2),("7",1)]. 2ⁿᵈ smallest: index=3 (second "4", index=3).
- Query [2,2]: Trim last 2 digits → ["24","37","96","04"]. Sorted: [("04",3),("24",0),("37",1),("96",2)]. 2ⁿᵈ smallest: index=0.

**Example 3:**  
Input:  
`nums = ["001","002","003","004"]`,  
`queries = [[3,2],[1,3]]`  
Output:  
`[2,0]`  
*Explanation:*  
- Query [3,2]: Trim last 2 digits → ["01","02","03","04"]. Sorted: [("01",0),("02",1),("03",2),("04",3)]. 3ʳᵈ smallest: index=2.
- Query [1,3]: Trim last 3 digits → ["001","002","003","004"]. 1ˢᵗ smallest: index=0.

### Thought Process (as if you’re the interviewee)  
Start with brute-force:  
- For each query, trim all numbers, pair each with its original index, sort by value (and index for ties), and pick the kᵗʰ smallest.

Better than brute-force?  
- If queries share the same `trim`, cache sorted lists for those trims to avoid recomputation (as in group-by approach); but constraints (nums, queries ≤ 100) mean complexity is fine even with brute force, so optimization may not be needed except for real large-scale data.

Why this approach?  
- Trimming substrings and sorting by value + index is direct and transparent.
- The problem prioritizes sorting by trimmed value, then by original index for duplicates.

Trade-offs:  
- Extra memory for caching trims, but that’s negligible for small n.
- Flexibility: easy to handle odd trims, leading zeros, etc.

### Corner cases to consider  
- All numbers are the same string, but indexes differ.
- k larger than array size (constraint prevents this, but check).
- Trims of length equal to the original number (no actual trim).
- Potential ties among trimmed values; must return the smallest index.
- Leading zeros: strings compare lexicographically, but leading zeros matter.

### Solution

```python
def smallestTrimmedNumbers(nums, queries):
    result = []
    for k, trim in queries:
        # Trim each number to its last 'trim' digits and pair with original index
        trimmed = []
        for idx, num in enumerate(nums):
            trimmed_num = num[-trim:]
            trimmed.append((trimmed_num, idx))
        # Sort by trimmed value, then by original index (Python's sort is stable)
        trimmed.sort()
        # Get the k-1ᵗʰ smallest (since k is 1-based)
        result.append(trimmed[k - 1][1])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q × n × log n), where q = #queries, n = #nums. For each query, all numbers are trimmed (O(n)), and sorted (O(n log n)), repeated for q queries.
- **Space Complexity:** O(n) extra for each sorted trimmed list per query, O(q) for result. If using caching for repeated trims, could potentially increase, but still small due to constraints.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums or queries have up to 10⁵ elements?  
  *Hint: How would you process multiple queries efficiently? Can you preprocess sorted arrays for each unique trim value?*

- How would you handle queries online (one by one) with very large data?  
  *Hint: Consider radix sort or bucket sort for strings; avoid sorting repeatedly for every query.*

- How would you generalize if "trim" means removing arbitrary slices, not just from the left?  
  *Hint: Think about substring extraction, and whether to index substrings up front for quick lookup.*

### Summary
This is a **custom sorting and substring/trim** problem, often seen in interviews for string manipulation and sort customization.  
It’s grounded in classic sort patterns (key = trimmed string, tiebreak = index), as well as preprocessing (for efficiency if many queries share trims).  
Applicable to problems like "kᵗʰ smallest of custom element representation," or where lexicographical comparison of substrings matters.