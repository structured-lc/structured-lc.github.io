### Leetcode 1086 (Easy): High Five [Practice](https://leetcode.com/problems/high-five)

### Description  
Given a list of score records, where each record is a pair [student_id, score], compute the average of the **top five** scores for each student. Each student appears multiple times with different scores. For every student, return their id and the average of their top five scores (average should be integer division, i.e., round down). Output the result as a list of pairs, sorted by student id ascending.

### Examples  

**Example 1:**  
Input: `items = [[1, 91], [1, 92], [2, 93], [2, 97], [1, 60], [2, 77], [1, 65], [1, 87], [1, 100], [2, 100], [2, 76]]`  
Output: `[[1, 87], [2, 88]]`  
*Explanation:  
Student 1 top five: 100, 92, 91, 87, 65 → (100+92+91+87+65) // 5 = 87  
Student 2 top five: 100, 97, 93, 77, 76 → (100+97+93+77+76) // 5 = 88*

**Example 2:**  
Input: `items = [[5, 70], [5, 80], [5, 90], [5, 60], [5, 110], [5, 95]]`  
Output: `[[5, 89]]`  
*Explanation:  
Student 5 top five: 110, 95, 90, 80, 70 → (110+95+90+80+70) // 5 = 89*

**Example 3:**  
Input: `items = [[3, 50], [3, 50], [3, 50], [3, 50], [3, 50]]`  
Output: `[[3, 50]]`  
*Explanation:  
Student 3 only has 5 scores; average is (50+50+50+50+50)//5=50*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Group all scores by student id. For each student, sort their scores in descending order, pick the top five, calculate average using integer division, and track results. Finally, sort result pairs by student id.
- **Can we optimize?**  
  Instead of sorting every score list (O(n log n)), maintain, for each student, a *min-heap* of size 5. Insert scores; if heap exceeds 5, pop the smallest. After all records, the heap has the student’s five highest scores. Sum them and average.  
  This improves per-student processing from sorting all their scores (if there are more than 5) to just heap operations O(log 5) per insertion.
- **Why heap?**  
  It automatically keeps the top five elements for each student, saves processing time, and avoids full sorts.

### Corner cases to consider  
- Student has exactly 5 scores.
- All scores are the same.
- Students appear in non-consecutive order.
- Large number of students.
- Student ids not starting at 0 or 1.
- Multiple students with the same scores.

### Solution

```python
def highFive(items):
    # Step 1: Collect scores per student using a dictionary of min-heaps
    from collections import defaultdict
    import heapq

    student_scores = defaultdict(list)
    
    for student_id, score in items:
        heapq.heappush(student_scores[student_id], score)
        # If more than 5, remove the smallest (keep only the top 5)
        if len(student_scores[student_id]) > 5:
            heapq.heappop(student_scores[student_id])
    
    result = []
    for student_id in sorted(student_scores):
        top_five = student_scores[student_id]
        # Now top_five may not be sorted, so just sum and do integer division
        avg = sum(top_five) // 5
        result.append([student_id, avg])
    
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log 5) ≈ O(n), where n is the number of score records. Each heap operation per student is O(log 5), but since 5 is constant, the work per record is O(1) amortized; sorting of unique student_ids is O(k log k) (k = number of students).
- **Space Complexity:**  
  O(n) in the worst case for all input records, but effectively O(k) extra (where k = student count), as each student keeps at most 5 scores.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a student may have fewer than five scores?  
  *Hint: How would you adjust your algorithm to average all available scores in that case?*
  
- Can you output the results in descending order based on the average?  
  *Hint: Consider custom sorting or using a max-heap after calculating averages.*

- How would you handle if the input is streamed (i.e., cannot store all records at once)?  
  *Hint: Think about using heaps and external merge approaches to process data in chunks.*

### Summary  
This problem demonstrates a common *"group and aggregate"* pattern, specifically the use of heaps to track top-k elements per group efficiently. The *min-heap* pattern is useful anywhere you need to maintain k largest/smallest values in a stream or collection (e.g., leaderboard problems, k-th largest, moving averages). It also illustrates how sorting and data structure choices affect time complexity when aggregating grouped data.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Determine the Winner of a Bowling Game(determine-the-winner-of-a-bowling-game) (Easy)