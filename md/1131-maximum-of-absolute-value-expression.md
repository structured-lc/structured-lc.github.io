### Leetcode 1131 (Medium): Maximum of Absolute Value Expression [Practice](https://leetcode.com/problems/maximum-of-absolute-value-expression)

### Description  
You are given two integer arrays, `arr1` and `arr2`, both of length n.  
Your task is to compute the maximum value of the following expression over all possible pairs of indices i, j (0 ≤ i, j < n):

|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|

That is, you need to find two indices i and j such that the sum of the absolute differences between arr1 at i and j, arr2 at i and j, and i and j themselves is maximized.

### Examples  

**Example 1:**  
Input: `arr1 = [1,2,3,4]`, `arr2 = [-1,4,5,6]`  
Output: `13`  
*Explanation: If i=0, j=3: |1−4| + |−1−6| + |0−3| = 3 + 7 + 3 = 13.*

**Example 2:**  
Input: `arr1 = [1,-2,-5,0,10]`, `arr2 = [0,-2,-1,-7,-4]`  
Output: `20`  
*Explanation: If i=4, j=2: |10−(−5)| + |(−4)−(−1)| + |4−2| = 15 + 3 + 2 = 20.*

**Example 3:**  
Input: `arr1 = [1,1]`, `arr2 = [1,1]`  
Output: `1`  
*Explanation: The only differences come from the indices, so |0−1| = 1.*

### Thought Process (as if you’re the interviewee)  
Start by considering the brute-force approach:  
- Try all pairs (i, j), and directly compute the expression for each.  
- The obvious time complexity is O(n²), which is inefficient for large arrays (n up to 40,000).

Notice that the formula |a−b| + |c−d| + |i−j| can be reframed by considering the absolute values.  
- For any pair, the absolute difference can be split into cases depending on the sign.
- Each |x − y| can be ±(x − y). With three terms, there are 2³ = 8 sign combinations.
- However, due to symmetry, we only need to consider 4 major versions:
    - arr1[i] + arr2[i] + i
    - arr1[i] + arr2[i] - i
    - arr1[i] - arr2[i] + i
    - arr1[i] - arr2[i] - i
    - ...and their negatives.

For each sign combination:
- Compute for each index i a transformed value (using + or − for arr1[i], arr2[i], i).
- For each transformation, track the max and min values.
- The difference between the max and min for each combination is a candidate answer.
- The overall answer is the maximum among all these candidates[1][2][3].

This reduces the problem to O(n) time:  
- Loop through each sign pattern (4 total).
- For each, single pass through the array, updating max and min.

### Corner cases to consider  
- Arrays where all elements are equal (output only depends on index difference).
- Arrays of length 2.
- Arrays with negative, zero, and positive values.
- Large input arrays (must achieve O(n)).
- Indices i = j (expression evaluates to 0).

### Solution

```python
def maxAbsValExpr(arr1, arr2):
    n = len(arr1)
    ans = 0
    # Each sign pattern: [ (s1, s2, s3) for arr1, arr2, i ]
    for s1, s2, s3 in [(1, 1, 1), (1, 1, -1), (1, -1, 1), (1, -1, -1)]:
        maximum = float('-inf')
        minimum = float('inf')
        for i in range(n):
            value = s1 * arr1[i] + s2 * arr2[i] + s3 * i
            maximum = max(maximum, value)
            minimum = min(minimum, value)
        ans = max(ans, maximum - minimum)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
    - For each of 4 sign patterns, one linear pass (4 × n).  
    - Much faster than brute-force O(n²).
- **Space Complexity:** O(1) extra space.  
    - Only variables for min, max, and the answer are needed.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize the approach for k arrays, not just 2?  
  *Hint: How would you extend the number of sign patterns?*

- What if n is huge, but only a few values differ?  
  *Hint: Would segment trees or other structures help?*

- What if input arrays are streamed and you need the result online?  
  *Hint: Can you maintain min/max values incrementally?*

### Summary
This problem is an excellent test of mathematical pattern recognition and reduction of brute-force combinations. The approach uses a transformation to reduce the exhaustive comparison of all pairs into four linear scans using the triangle/absolute value properties—a common but nontrivial interview trick that also appears in other "maximum Manhattan distance" type problems and can be generalized to higher dimensions or more arrays.


### Flashcard
For each sign combination, compute max of |arr₁[i] ± arr₁[j] + arr₂[i] ± arr₂[j] + i ± j|; track min/max for each case to get the answer.

### Tags
Array(#array), Math(#math)

### Similar Problems
