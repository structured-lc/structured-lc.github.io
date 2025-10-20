### Leetcode 1105 (Medium): Filling Bookcase Shelves [Practice](https://leetcode.com/problems/filling-bookcase-shelves)

### Description  
You are given a list of books, where each book is described by its thickness and height, as well as a fixed shelf width. You must place the books onto shelves in their given order. Each shelf can hold a sequence of consecutive books, provided their total thickness does not exceed the shelf width. The height of a shelf is the maximum height among books on that shelf. Once no more books can fit on the current shelf, a new shelf is started above it. The goal is to minimize the sum of all shelf heights — that is, the total height of the stacked shelves needed to place all the books in order.

### Examples  

**Example 1:**  
Input: `books = [[1,1],[2,3],[2,3],[1,1]], shelfWidth = 4`  
Output: `4`  
*Explanation:*
- Place books `[[1,1],[2,3]]` on the first shelf (`1+2=3≤4`, max height 3).
- Place the remaining `[[2,3],[1,1]]` on the second shelf (`2+1=3≤4`, max height 3).  
- But you can actually do `[[1,1],[2,3],[1,1]]` on one shelf (`1+2+1=4≤4`, max height 3), then `[[2,3]]` alone (`2≤4`, height 3).  
- Optimal is place `[[1,1],[2,3],[2,3],[1,1]]`:  
  - First shelf: `[[1,1],[2,3]]` → height 3  
  - Second shelf: `[[2,3],[1,1]]` → height 3  
But combining in order, you can have height 4 by putting first three books on first shelf (`1+2+2=5>4`), so the best is total height 4.

**Example 2:**  
Input: `books = [[1,3],[2,4],[3,2]], shelfWidth = 6`  
Output: `4`  
*Explanation:*  
- Shelf1: Place all books (`1+2+3=6≤6`), the maximal height is 4.

**Example 3:**  
Input: `books = [[2,4],[3,2],[1,3]], shelfWidth = 4`  
Output: `7`  
*Explanation:*  
- Shelf1: `[[2,4]]` (thickness=2, height=4)  
- Shelf2: `[[3,2]]` can't fit (3>4–2), so new shelf: `[[3,2]]` (thickness=3, height=2)  
- Shelf3: `[[1,3]]` (thickness=1, height=3)  
Total height: 4+2+3=9, but by grouping `[[2,4],[1,3]]` on the first shelf (2+1=3≤4, height 4), and `[[3,2]]` on the next shelf, total height 4+2=6.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible ways to split the list of books into groupings of consecutive books such that each group (shelf) does not exceed the shelfWidth. For each split, calculate the maximal height for each shelf and sum them. Track the minimal total height over all partitions.
- This is highly inefficient because it has exponential possibilities.
- **Observation:** Since the order of placement must be preserved, we can use **Dynamic Programming**: For every starting position, make a decision on how many books to place on the current shelf (as many as fit), then recursively solve for the rest. Store overlapping subproblems.
- **DP design:**  
  - dp[i] = minimal height needed to arrange books[i:]  
  - For dp[i], consider placing books[i..j] on the same shelf (sum of thickness ≤ shelfWidth), take max height of this shelf, recur for dp[j+1].  
  - Take the minimal among all possible j for dp[i].

- **Trade-offs:**  
  - Time is reduced to O(n²) using memoization (since for each book, we try at most n groupings).
  - No need for complex data structures.
  - The order constraint and grouping constraint make this a classic DP interval/partitioning pattern.

### Corner cases to consider  
- Empty books list: should return 0.
- All books fit on one shelf.
- No two books can fit together, each forced onto its own shelf.
- Books with the same or variable heights and widths.
- Shelves with width smaller than the smallest book.
- Some books with zero width (if allowed).
- Large n (1000), to check DP efficiency.

### Solution

```python
def minHeightShelves(books, shelfWidth):
    n = len(books)
    # dp[i]: min height needed for books[i:]
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # base case: no books left needs 0 height

    for i in range(n - 1, -1, -1):
        width, height = 0, 0
        # Try every possible number of books to place on this shelf
        for j in range(i, n):
            width += books[j][0]
            if width > shelfWidth:
                break
            height = max(height, books[j][1])
            dp[i] = min(dp[i], height + dp[j + 1])
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  For each position i, you check at most n books to place on the shelf, leading to O(n²) overall.
- **Space Complexity:** O(n).  
  Only dp array of size n+1 is stored (input and dp, no recursion stack as DP is bottom-up).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the order of books does *not* have to be preserved?  
  *Hint: Think about grouping books across the list by size, maybe sort them by height or width.*

- What if placing a book costs extra if its height is > threshold?  
  *Hint: Try modifying your DP state to accumulate extra "penalty" cost.*

- How would you handle very large input (books > 10⁵)?  
  *Hint: Can you optimize the DP further, perhaps only allow a fixed max number of books per shelf?*

### Summary
This problem uses the **Interval DP / Partition DP** pattern, where at each index you decide partition points and solve subproblems recursively, memoizing as you go. The central challenge comes from the preservation of order and the local constraint on shelf width. This pattern is common in problems about grouping or segmenting sequences for minimal cost, e.g., "Word Break," "Palindrome Partitioning," and various scheduling/segmentation tasks.


### Flashcard
DP where dp[i] = minimum height to place first i books; try placing books[j:i] on a new shelf if width fits.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
