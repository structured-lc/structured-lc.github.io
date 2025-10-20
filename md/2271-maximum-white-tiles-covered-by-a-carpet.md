### Leetcode 2271 (Medium): Maximum White Tiles Covered by a Carpet [Practice](https://leetcode.com/problems/maximum-white-tiles-covered-by-a-carpet)

### Description  
Given a list of intervals, where each interval `[start, end]` represents a stretch of consecutive white tiles on a floor, and the length of a carpet (`carpetLen`), the task is to determine the maximum number of white tiles that can be covered by placing the carpet optimally. The carpet can cover a continuous segment, even if it doesn't align exactly with interval boundaries. Overlap is allowed, and the intervals may be disjoint.

### Examples  

**Example 1:**  
Input: `tiles = [[1,5], [10,11], [12,18], [20,25], [30,32]]`, `carpetLen = 10`  
Output: `9`  
Explanation: Placing the carpet starting at tile 10 covers: [10,11] and [12,18], altogether 9 tiles.

**Example 2:**  
Input: `tiles = [[3,4], [6,9], [12,13]]`, `carpetLen = 4`  
Output: `4`  
Explanation: Carpet from position 6 covers tiles 6,7,8,9 (4 tiles).

**Example 3:**  
Input: `tiles = [[10,11]]`, `carpetLen = 2`  
Output: `2`  
Explanation: Carpet from position 10 covers 10 and 11 (2 tiles).

### Thought Process (as if you’re the interviewee)  
- Start by sorting the intervals, as optimal placement will depend on their order.
- Brute-force: Try placing the carpet to start at every possible tile, count the covered tiles, and track the maximum. This has poor performance due to overlapping checks and redundant calculations.
- Optimization: Use a **sliding window** over the sorted intervals. For each starting interval, extend the window as long as the next intervals fall within the carpet's reach.
- Compute prefix sums to quickly know the total number of tiles covered up to each interval.
- For partial overlaps at the end of the carpet, adjust the coverage based on how much of the last interval the carpet covers.
- This approach is much faster because it avoids unnecessary repeated counting and leverages sorting and efficient window expansion.

### Corner cases to consider  
- Intervals with length ≥ carpetLen (carpet can fully lie within one interval).
- Very sparse intervals where there may be large gaps.
- All intervals together have length < carpetLen (carpet can cover all, possibly extra).
- One interval only.
- carpetLen = 1 (minimal size).
- Intervals with exactly one tile.
- Gaps exactly of size 1 between intervals.

### Solution

```python
from bisect import bisect_right

def maximumWhiteTiles(tiles, carpetLen):
    # Sort the tiles by their starting positions
    tiles.sort()
    n = len(tiles)
    
    # Precompute prefix sum of the number of white tiles up to each interval
    prefix = [0] * (n + 1)
    for i, (start, end) in enumerate(tiles):
        prefix[i+1] = prefix[i] + (end - start + 1)
    
    # Store the starting positions for binary search
    starts = [start for start, _ in tiles]
    
    max_covered = 0
    
    # Try placing the carpet starting from each interval
    for i, (start, _) in enumerate(tiles):
        carpet_end = start + carpetLen - 1
        
        # Find the last interval whose start is ≤ carpet_end
        j = bisect_right(starts, carpet_end) - 1
        
        # Calculate uncovered part in the last (possibly partial) tile segment
        not_covered = max(0, tiles[j][1] - carpet_end)
        
        # Total tiles covered in range [i, j], subtract any uncovered in the last interval
        covered = prefix[j+1] - prefix[i] - not_covered
        
        max_covered = max(max_covered, covered)
        
        # Early exit: if covered == carpetLen, that's the max possible
        if max_covered >= carpetLen:
            return carpetLen
    
    return max_covered
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of intervals. Sorting the tiles takes O(n log n), and for each interval, we do a binary search in O(log n), repeated n times.
- **Space Complexity:** O(n), for prefix sums and the starts array; we do not use recursion or large extra structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the carpet must cover only full tile segments, not partials?  
  *Hint: Adjust logic so the carpet only stops at tile ends or only counts intervals completely inside the range.*

- How would you handle multiple carpets with the same length?  
  *Hint: DP/stateful approach, placing and skipping intervals.*

- How to handle updates in the tile intervals (add/remove intervals)?  
  *Hint: Consider data structures for interval addition/removal, e.g., segment trees or interval trees for dynamic queries.*

### Summary
This solution uses a standard **prefix sum plus sliding window with binary search** pattern, common for range-sum or maximum cover-type interval problems. It's especially useful for interval covering/partitioning scenarios and is a good example of combining prefix sums with two-pointer or binary search techniques. It also demonstrates handling partial overlaps efficiently—a recurring theme in scheduling and interval-coverage LeetCode problems.


### Flashcard
Sort intervals, use sliding window and prefix sums to find maximum tiles covered by a carpet of fixed length—O(n log n).

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Sliding Window(#sliding-window), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- Maximum Number of Vowels in a Substring of Given Length(maximum-number-of-vowels-in-a-substring-of-given-length) (Medium)