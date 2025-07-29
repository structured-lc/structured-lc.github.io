### Leetcode 2545 (Medium): Sort the Students by Their Kth Score [Practice](https://leetcode.com/problems/sort-the-students-by-their-kth-score)

### Description  
Given a 2D matrix `score` where `score[i][j]` represents the score of the iᵗʰ student in the jᵗʰ exam, and an integer `k`, **sort the students (the rows) in descending order based on their score in the kᵗʰ exam**. Return the resulting matrix.

Every row (student) will have the same number of exam scores, and all scores are integers. The order of students who have the same score in the kᵗʰ column must be preserved (stable sorting). 

### Examples  

**Example 1:**  
Input:  
`score = [[10,6,9,1],[7,5,11,2],[4,8,3,15]], k = 2`  
Output:  
`[[7,5,11,2],[10,6,9,1],[4,8,3,15]]`  
*Explanation:*
- Student scores in k = 2 column: 9, 11, 3.
- Sorted order by 2ⁿᵈ exam: [11, 9, 3] → so the new matrix is rows 1, 0, 2.

**Example 2:**  
Input:  
`score = [[3,4],[5,6]], k = 0`  
Output:  
`[[5,6],[3,4]]`  
*Explanation:*  
- Student scores in k = 0 column: 3, 5.
- Sorted order by 0ᵗʰ exam: [5, 3] → new order: row 1, row 0.

**Example 3:**  
Input:  
`score = [[1,2,3]], k = 1`  
Output:  
`[[1,2,3]]`  
*Explanation:*  
Only one student; nothing changes.

### Thought Process (as if you’re the interviewee)  
This problem is a classic example of sorting a 2D matrix (list of lists) according to a specific column.  
- The brute-force way is to:
  - Extract the kth element from every row.
  - Sort the rows according to that value, in descending order.
- An efficient and straightforward approach is to use a **custom sort**:
  - For every row, use the score at index k as a key, sort in descending order.
- Since Python's `sorted` or `.sort()` is stable, it will preserve the original order for ties.

Trade-offs:
- Time complexity is dominated by the sort: O(m log m), where m is number of students (rows).
- No need for extra memory except for the sorted output (and in-place can be done if needed).

### Corner cases to consider  
- Matrix with zero students: `score = []`
- Only one student: `score = [[x, y, ...]]`
- Only one exam: `score = [ [...], [...], ... ]` where each row has length 1
- Multiple students with the same kth score: check for order stability
- Large k (k = last index)
- All numbers negative, or all numbers equal

### Solution

```python
def sortTheStudents(score, k):
    # Sort the students (rows) by the kᵗʰ score in descending order
    # Use lambda to pull out the kᵗʰ score for each row
    n = len(score)
    # If no students or only one, return as is
    if n <= 1:
        return score
    return sorted(score, key=lambda row: -row[k])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m log m), where m is number of students (rows).  
  Each comparison looks up the kᵗʰ index, and sorting takes O(m log m).

- **Space Complexity:**  
  O(m) for the output list (since sorted returns a new list).  
  If sorted in-place with `.sort()`, space can be reduced to O(1) extra excluding the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if scores are not unique in the kᵗʰ column?  
  *Hint: What does the stable sort do?*

- How would you sort by ascending order instead?  
  *Hint: Change the sign or sort key logic.*

- Can you do this sort in place (without additional memory)?  
  *Hint: Use the `.sort()` method on the input list and customize the key.*

### Summary
This problem uses the **custom sorting by column** pattern—a common interview pattern for matrix problems. It is easily solved using a lambda function as the sorting key. This same pattern is frequently applied for DataFrame sorting, scheduling, leaderboard generation, and more. The use of stable sort ensures that rows with the same kᵗʰ score preserve their original order, which can be important in real-world data processing.