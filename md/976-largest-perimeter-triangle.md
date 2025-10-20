### Leetcode 976 (Easy): Largest Perimeter Triangle [Practice](https://leetcode.com/problems/largest-perimeter-triangle)

### Description  
Given an array of positive integers, each representing a side length, return the largest perimeter of a triangle that can be formed from any three of these lengths. For a set of three lengths to make a triangle, the sum of any two lengths must be greater than the third (the triangle inequality). If it's impossible to construct any triangle, return 0.

### Examples  

**Example 1:**  
Input: `[2, 1, 2]`  
Output: `5`  
*Explanation: The three sides (2,2,1) can form a triangle since every pair sums to more than the remaining side. The perimeter is 2+2+1 = 5.*

**Example 2:**  
Input: `[1, 2, 1]`  
Output: `0`  
*Explanation: The largest side (2) is not less than the sum of the other two (1+1). No triangle can be formed.*

**Example 3:**  
Input: `[3, 2, 3, 4]`  
Output: `10`  
*Explanation: Pick the sides 3, 3, and 4. All triangle inequalities are satisfied. The perimeter is 3+3+4 = 10.*

### Thought Process (as if you’re the interviewee)  
First, to check if three sides can form a triangle, use the triangle inequality: each pair must sum to more than the remaining side.  
Brute-force would require checking all ⌊n/3⌋ triplets for the property, which is slow (O(n³)).  
To optimize, sort the array so largest sides are at the end. Starting from the largest possible triple, check if the sum of the two smaller sides is greater than the largest.  
If so, that's our answer (since larger sides → larger perimeter). If not, move down the array until you find such a triple or reach the start.  
This is greedy and efficient, because using the largest values first gives us the max perimeter.

### Corner cases to consider  
- Array with fewer than three elements (can't form a triangle)
- All sides are of equal length
- Sides where the sum of two always equals the third (degenerate, not valid)
- Very large values (overflow isn't an issue for Python, but important in other languages)
- Multiple triangles possible; must find *largest* perimeter

### Solution

```python
def largestPerimeter(nums):
    # Step 1: Sort the sides in ascending order
    nums.sort()
    n = len(nums)
    
    # Step 2: Iterate from largest triplet down to smaller ones
    for i in range(n - 1, 1, -1):
        a = nums[i - 2]
        b = nums[i - 1]
        c = nums[i]
        # Step 3: Check the triangle inequality
        if a + b > c:
            # Valid triangle found; return its perimeter
            return a + b + c
    # Step 4: No valid triangle found
    return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting; the post-sort scan is O(n), so sorting dominates.
- **Space Complexity:** O(1) extra space, assuming sorting in-place, not counting input storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must return *all* possible valid triangle perimeters?
  *Hint: Try all triplets after sorting and keep a list of those that satisfy the triangle inequality.*

- How would you handle streaming input where you cannot sort all at once?
  *Hint: Keep a sliding window or a fixed-size heap with the largest elements seen so far.*

- Can you solve this without sorting? Under what conditions?
  *Hint: Consider counting sort if bounds allow, or analyze sorted insertions.*

### Summary
This approach uses sorting followed by a single scan, a common greedy-plus-scan coding pattern. It efficiently finds the combination for the maximal perimeter using the triangle inequality and is useful in interview scenarios for problems requiring max/min selection after sorting. This technique also applies to other geometric or combinatorial selection problems.


### Flashcard
Sort nums descending, then for each triple, if the sum of the two smaller sides is greater than the largest, return their sum as the largest perimeter.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Largest Triangle Area(largest-triangle-area) (Easy)