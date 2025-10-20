### Leetcode 1054 (Medium): Distant Barcodes [Practice](https://leetcode.com/problems/distant-barcodes)

### Description  
Given a list of integers representing barcodes, rearrange them so that **no two adjacent barcodes are the same**. The function should return any one arrangement that satisfies this condition. It is guaranteed that a solution exists.

### Examples  

**Example 1:**  
Input: `[1,1,1,2,2,2]`  
Output: `[2,1,2,1,2,1]`  
*Explanation: Barcodes with the same value are separated as much as possible. By alternating, no two adjacent numbers are the same.*

**Example 2:**  
Input: `[1,1,1,1,2,2,3,3]`  
Output: `[1,3,1,3,1,2,1,2]`  
*Explanation: Place the most frequent number (1) at even positions to maximize separation, then fill the remaining slots with the others. No adjacent barcodes are equal.*

**Example 3:**  
Input: `[7,7,7,8,8,9]`  
Output: `[7,8,7,8,7,9]`  
*Explanation: Most frequent (7) alternates with 8 and finally 9.*

### Thought Process (as if you’re the interviewee)  
First, I’d check the **brute-force** approach: try all permutations and select one where no two adjacent elements are equal. But this is extremely inefficient even for small input sizes.

To optimize, I’d note the **core problem** is that placing duplicate numbers too close together causes failure. The best way to avoid this is to **place the most frequent barcode as far apart as possible**—fill even indices first, then odd ones.

Steps:
- **Count the frequency** of each barcode.
- **Sort barcodes** by frequency (highest first).
- **Fill results array**: put the most frequent numbers into even positions (0,2,4,...) to space them out, and once we fill all even positions, fill the odd positions.
- This process ensures the most frequent values never become neighbors.

This idea works because placing high-frequency barcodes far apart prevents clusters and naturally spreads duplicates. The guarantee of a valid answer comes from the input promises.

Trade-off: This method is O(n log n) due to sorting, but space is O(n) for the result.

### Corner cases to consider  
- Input array has only one element.
- All barcodes are the same (edge is covered by the guarantee: answer exists).
- Two types with strict alternation: `[1,2,1,2,...]`.
- Input already satisfies the condition.
- Very large frequency difference, e.g., `[5,5,5,5,1,2]`.
- Every value is unique.

### Solution

```python
def rearrangeBarcodes(barcodes):
    # Step 1: Count frequencies
    freq = {}
    for b in barcodes:
        freq[b] = freq.get(b, 0) + 1

    # Step 2: Sort by frequency (descending), then by value (for stability)
    sorted_barcodes = sorted(barcodes, key=lambda x: (-freq[x], x))
    
    n = len(barcodes)
    res = [0] * n

    # Step 3: Fill even indices first (0, 2, 4, ...)
    idx = 0
    for b in sorted_barcodes:
        res[idx] = b
        idx += 2
        if idx >= n:
            idx = 1  # Switch to odd indices
    
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Count frequencies: O(n)
  - Sort barcodes by frequency: O(n log n)
  - Fill the result: O(n)

- **Space Complexity:** O(n)  
  - Extra hash map for counting and result array for output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the maximum frequency of any barcode is greater than ⌊n/2⌋?
  *Hint: Think about the pigeonhole principle—would it always be possible to separate them with this constraint?*

- Can you do this in linear time without sorting?
  *Hint: Use a heap or bucket-sort style approach based on the frequency bound.*

- How would you handle the case if there is no guarantee that an answer exists?
  *Hint: Add a validity check—compare maximum frequency to ⌊n/2⌋ + 1.*

### Summary
This is a **greedy rearrangement** problem where we space out the most frequent elements first. The solution follows a pattern similar to rearrange-string problems, such as "Rearrange String k Distance Apart" and "Task Scheduler". The technique of distributing high-frequency elements as far apart as possible is a common approach in interval separation and coloring problems.


### Flashcard
Place the most frequent barcode at even indices first, then fill odd indices, to avoid adjacent duplicates.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Counting(#counting)

### Similar Problems
