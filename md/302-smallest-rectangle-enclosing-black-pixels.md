### Leetcode 302 (Hard): Smallest Rectangle Enclosing Black Pixels [Practice](https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels)

### Description  
Given a binary matrix **image** of size m × n representing an image (where '0' is a white pixel and '1' is a black pixel), all black pixels form one single connected region (connected vertically or horizontally).  
You are also given coordinates (x, y) of one known black pixel.  
**Find the area of the smallest axis-aligned rectangle that encloses all black pixels in the image.**  
The algorithm should run in less than O(m × n) time.

### Examples  

**Example 1:**  
Input:  
```
image = [
    ["0", "0", "1", "0"],
    ["0", "1", "1", "0"],
    ["0", "1", "0", "0"]
], 
x = 0, y = 2
```  
Output: `6`  
Explanation. The black region fits inside a rectangle from (0,1) to (2,2):  
```
[
    0 1 2 3
0 | 0 0 1 0
1 | 0 1 1 0
2 | 0 1 0 0
]
```
The rectangle covers rows 0–2 and columns 1–2, so area = (2 - 0 + 1) × (2 - 1 + 1) = 3 × 2 = 6.

**Example 2:**  
Input:  
```
image = [["1"]], x = 0, y = 0
```  
Output: `1`  
Explanation. The only pixel is black, forming a 1 × 1 rectangle.

**Example 3:**  
Input:  
```
image = [
    ["0", "0", "0", "0"],
    ["0", "1", "0", "0"],
    ["0", "0", "0", "0"]
], 
x = 1, y = 1
```  
Output: `1`  
Explanation. The rectangle covers only row 1, column 1. Area = 1.

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Scan every cell to update the minimum and maximum rows and columns where a '1' appears. Then, compute area as (max_row - min_row + 1) × (max_col - min_col + 1).  
  This is O(m × n) time.

- **Can we do better?**  
  Since all black pixels are one connected component and we know a black pixel’s location, we can search for the minimal rectangle using *binary search*:
  - We use binary search to find the minimum and maximum row indices containing black pixels.
  - Repeat similarly for columns.
  - For example, to find the top edge, binary search [0, x] for the first row with a black pixel.  
  - To check for existence of a '1' in a row or column, scan the relevant part (which is O(n) per check, but limited in total iterations).

- **Why binary search is allowed:**  
  We do not need to visit all pixels—just enough to bound the black area. This meets the sub-O(m × n) requirement.

- **Trade-offs:**  
  - Binary search reduces the number of row/col scans from m or n to log m/log n, at the cost of full scan per binary search check.
  - The binary search is optimal given the constraints.

### Corner cases to consider  
- All pixels are black (full matrix of '1's).
- Only a single black pixel.
- Black region touches the image’s edge.
- Completely white image is not possible (since a black pixel is guaranteed).
- Non-square image (m ≠ n).
- Black rectangle is only in one row/column.

### Solution

```python
def minArea(image, x, y):
    m, n = len(image), len(image[0])

    # Helper to check if any black pixel ('1') exists in a given row
    def has_black_in_row(row):
        for col in range(n):
            if image[row][col] == '1':
                return True
        return False

    # Helper to check if any black pixel ('1') exists in a given column
    def has_black_in_col(col):
        for row in range(m):
            if image[row][col] == '1':
                return True
        return False

    # Binary search for boundary
    def search_low(start, end, is_row):
        while start < end:
            mid = (start + end) // 2
            if (has_black_in_row(mid) if is_row else has_black_in_col(mid)):
                end = mid  # keep mid
            else:
                start = mid + 1
        return start

    def search_high(start, end, is_row):
        while start < end:
            mid = (start + end) // 2
            if (has_black_in_row(mid) if is_row else has_black_in_col(mid)):
                start = mid + 1
            else:
                end = mid
        return start

    # Find top, bottom, left, right bounds
    top = search_low(0, x, is_row=True)
    bottom = search_high(x + 1, m, is_row=True)
    left = search_low(0, y, is_row=False)
    right = search_high(y + 1, n, is_row=False)

    # Rectangle area = height × width
    return (bottom - top) * (right - left)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Each of the four binary searches runs O(log m) or O(log n) times, and each check (to find a black pixel in a row or column) costs up to O(n) or O(m) respectively.  
  So total: O((m + n) × (log m + log n)).

- **Space Complexity:**  
  O(1). Only variables for indices are used; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if there were multiple disconnected black regions?  
  *Hint: You’d need to label each component—try BFS/DFS from each unvisited black pixel to get boundaries for each region.*

- How would you find the coordinates of the corners, not just the area?  
  *Hint: Return (top, left) and (bottom-1, right-1) as the bounding box corners.*

- Can you optimize the inner pixel scan for extremely large images?  
  *Hint: Row/column scans can be sped up with fast search or preprocessing; for very sparse images, index positions of '1's in advance.*

### Summary
This problem demonstrates a **binary search on boundaries** technique in a grid, which is useful for finding minimal bounding regions (e.g., for images, search spaces, or intervals where a condition is met).  
The coding pattern involves scanning with boundary tracking using binary search, and it’s broadly applicable wherever you want to efficiently localize features in 2D matrices when full O(mn) scans are too costly.

### Tags
Array(#array), Binary Search(#binary-search), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Find the Minimum Area to Cover All Ones II(find-the-minimum-area-to-cover-all-ones-ii) (Hard)
- Find the Minimum Area to Cover All Ones I(find-the-minimum-area-to-cover-all-ones-i) (Medium)