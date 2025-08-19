### Leetcode 2001 (Medium): Number of Pairs of Interchangeable Rectangles [Practice](https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles)

### Description  
You are given a list of rectangles where each rectangle is represented as `[width, height]`. Two rectangles are interchangeable if they have the same width-to-height ratio. Your task is to count the number of pairs `(i, j)` such that `0 ≤ i < j < n` and the two rectangles are interchangeable.

### Examples  

**Example 1:**  
Input: `rectangles = [[4,8],[3,6],[10,20],[15,30]]`  
Output: `6`  
Explanation:  
All rectangles have a width-to-height ratio of 1:2, so any pair is interchangeable. There are 4 rectangles and number of pairs is C(4,2) = 4×3/2 = 6.

**Example 2:**  
Input: `rectangles = [[4,5],[7,8]]`  
Output: `0`  
Explanation:  
The width-to-height ratios are 4:5 and 7:8; they are different, so there are no interchangeable pairs.

**Example 3:**  
Input: `rectangles = [[2,3],[4,6],[2,6],[4,12]]`  
Output: `2`  
Explanation:  
- First and second: 2:3 and 4:6 both reduce to 1:1.5, so this is a pair.
- Third and fourth: 2:6 and 4:12 both reduce to 1:3.  
Number of interchangeable pairs is 1 (from ratios 1:1.5) + 1 (from ratios 1:3) = 2.

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to check all pairs (i, j) and see if their ratios are equal. For each rectangle, compute width/height and compare to every other rectangle. This is O(n²) and will time out for large n.

To optimize, I will represent a rectangle’s ratio as a reduced fraction `(w/g, h/g)` where g = gcd(w, h). This avoids precision errors and floating-point issues.

We can use a hash map (dictionary) to count how many times each distinct ratio occurs. For each rectangle, as we process it, we add to our answer the current count of rectangles already seen with the same ratio. This gives us, for each group of size k, k×(k-1)/2 pairs, but we can compute that in one pass.

Optimizing this way keeps the time and space complexity at O(n), making it feasible for big inputs.

### Corner cases to consider  
- Empty `rectangles` list: answer is 0.
- All rectangles with different ratios: answer is 0.
- All rectangles with the same ratio: answer is C(n,2).
- Large values where gcd must be properly computed.
- Rectangles with zero width or height (problem constraints may disallow).
- Duplicate rectangles.

### Solution

```python
from math import gcd

def interchangeableRectangles(rectangles):
    # Map to count number of rectangles per unique ratio (as reduced tuple)
    ratio_count = {}
    pairs = 0
    
    for w, h in rectangles:
        g = gcd(w, h)
        # Represent ratio as tuple of reduced (width, height)
        key = (w // g, h // g)
        if key in ratio_count:
            pairs += ratio_count[key]
        ratio_count[key] = ratio_count.get(key, 0) + 1
        
    return pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rectangles. For each rectangle, gcd and hashmap operations are O(1) (as widths and heights are bounded by constraints).
- **Space Complexity:** O(n), for the hashmap holding up to n distinct ratios (in worst case if all are unique).

### Potential follow-up questions (as if you’re the interviewer)  

- What if widths and heights are very large and computing gcd is expensive?  
  *Hint: Is there any data structure or algorithm to speed up repeated gcd calls?*

- Could you solve the problem if rectangles were given as floating point ratios, or if precision was important?  
  *Hint: How would you handle precision/rounding or convert to a safe representation?*

- What if you had to return not just a count but the actual pairs’ indices?  
  *Hint: Store index lists along with ratio counts, then enumerate pairs.*

### Summary
This problem applies the **hash map counting** pattern, converting floating point ratio comparison into integer fraction comparison using gcd for normalization. Such reduction is used in problems involving proportionality or colinearity (like "max points on a line"). This approach is robust to value range and floating point errors, and can be used wherever equivalent relationships are computed from pairs or groups of integer-valued inputs.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting), Number Theory(#number-theory)

### Similar Problems
- Number of Good Pairs(number-of-good-pairs) (Easy)
- Count Nice Pairs in an Array(count-nice-pairs-in-an-array) (Medium)
- Replace Non-Coprime Numbers in Array(replace-non-coprime-numbers-in-array) (Hard)