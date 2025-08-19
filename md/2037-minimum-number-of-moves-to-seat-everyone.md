### Leetcode 2037 (Easy): Minimum Number of Moves to Seat Everyone [Practice](https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone)

### Description  
Given two arrays, **seats** and **students**, representing the positions of seats and students, the task is to move each student to a seat so that:
- Each seat gets exactly one student and no seat is double-occupied.
- You can increase or decrease a student's position by 1 in one move.
Find the minimum total number of moves required for all students to be seated.

### Examples  

**Example 1:**  
Input: `seats = [3,1,5]`, `students = [2,7,4]`  
Output: `4`  
*Explanation:  
Sort seats: [1,3,5]  
Sort students: [2,4,7]  
Matching: |1-2| + |3-4| + |5-7| = 1 + 1 + 2 = 4.*

**Example 2:**  
Input: `seats = [4,1,5,9]`, `students = [1,3,2,6]`  
Output: `7`  
*Explanation:  
Sort seats: [1,4,5,9]  
Sort students: [1,2,3,6]  
Matching: |1-1| + |4-2| + |5-3| + |9-6| = 0 + 2 + 2 + 3 = 7.*

**Example 3:**  
Input: `seats = [2,2,6,6]`, `students = [1,3,2,6]`  
Output: `4`  
*Explanation:  
Sort seats: [2,2,6,6]  
Sort students: [1,2,3,6]  
Matching: |2-1| + |2-2| + |6-3| + |6-6| = 1 + 0 + 3 + 0 = 4.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible assignments of students to seats — for each student, try all possible seats and calculate total move cost. However, with n students and seats, this is O(n!), which is not feasible for large n.

- **Optimization:**  
  Realize that to minimize total moves, **match the closest students to seats.** This can be achieved by sorting both arrays and pairing the smallest available student with the smallest seat, and so on.  
  For each pair, the move cost is the absolute difference between student position and seat position.

- **Why this works:**  
  Sorting ensures minimal crossing between assignments and avoids unnecessary long moves (similar to the assignment or Hungarian problem, but in 1D this greedy approach is optimal).

- **Trade-offs:**  
  Sorting takes O(n log n), which is very acceptable. The logic is simple and avoids complex matching algorithms.

### Corner cases to consider  
- Arrays with only one element: seats = [1], students = 
- Already aligned case: seats = [1,2,3], students = [1,2,3]
- Multiple students/seats at same position: seats = [2,2,2], students = [2,2,2]
- All students have to move in one direction: seats = [1,2,3], students = [4,5,6]
- Large distance gaps between seat positions

### Solution

```python
def minMovesToSeat(seats, students):
    # 1. Sort both arrays to greedily assign closest student to seat
    seats.sort()
    students.sort()
    total_moves = 0
    # 2. Sum absolute differences for each pair
    for i in range(len(seats)):
        total_moves += abs(seats[i] - students[i])
    return total_moves
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) — due to sorting the seats and the students arrays.

- **Space Complexity:**  
  O(1) beyond the input if sort is in-place, otherwise O(n) for the sort storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if some students can't be assigned to a seat (e.g., more students than seats)?
  *Hint: How would you handle cases with non-equal numbers?*
  
- How would you handle movement costs that aren't uniformly 1 per move (for example, cost per move varies)?
  *Hint: Can you adapt the cost calculation step?*

- How would you solve this if the seats and students were on a 2D grid?
  *Hint: Would sorting alone still work, or would you need a more general assignment algo?*

### Summary
This problem uses the **Greedy Two-Pointer approach after sorting** to achieve minimum assignment cost, a common pattern in minimum-matching and assignment problems in 1D. It's helpful to recognize sorting and greedy pairing as an optimal choice when moving costs are absolute differences, and is broadly applicable to similar matching/minimizing movement scenarios.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
