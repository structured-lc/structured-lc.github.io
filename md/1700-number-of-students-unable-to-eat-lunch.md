### Leetcode 1700 (Easy): Number of Students Unable to Eat Lunch [Practice](https://leetcode.com/problems/number-of-students-unable-to-eat-lunch)

### Description  
You are given two lists of the same length: **students** and **sandwiches**.  
- **students**: A queue, where each element is either 0 (prefers circular) or 1 (prefers square).  
- **sandwiches**: A stack, where the sandwich at index 0 is on top.  
At each round:  
- If the student at the front prefers the top sandwich, they take it and both leave.
- Otherwise, the student moves to the end of the queue.
This repeats until none of the students at the front want the top sandwich, and those students must leave hungry.  
Return the number of students who are unable to eat.

### Examples  

**Example 1:**  
Input: `students = [1,1,0,0]`, `sandwiches = [0,1,0,1]`  
Output: `0`  
*Explanation:  
- s0 wants 1 but top is 0 ⇒ goes to back  
- s1 wants 1 but top is 0 ⇒ goes to back  
- s2 wants 0 and top is 0 ⇒ eats  
- s3 wants 0 and new top is 1 ⇒ goes to back  
- s0 wants 1 and top is 1 ⇒ eats  
- s1 wants 1 and top is 0 ⇒ goes to back  
- s3 wants 0 and top is 0 ⇒ eats  
- s1 left, wants 1 and top is 1 ⇒ eats  
All get sandwiches.*

**Example 2:**  
Input: `students = [1,1,1,0,0,1]`, `sandwiches = [1,0,0,0,1,1]`  
Output: `3`  
*Explanation:  
- s0 eats (both 1)  
- s1 eats (both 1)  
- s2 eats (both 1)  
- s3 wants 0 but top is 0 ⇒ eats  
- s4 wants 0 and top is 0 ⇒ eats  
- s5 wants 1 but top is 0 ⇒ moves to end, and loop continues  
- Now, all remaining want 1 but sandwich is 0, so they cannot eat.  
3 students cannot eat.*

**Example 3:**  
Input: `students = [0,1,0]`, `sandwiches = [1,1,1]`  
Output: `2`  
*Explanation:  
- All students want 0 but only 1's are served, so only one student leaves hungry.*

### Thought Process (as if you’re the interviewee)  
First, we can try to simulate the process with a queue: rotate students to the back if they don’t eat the top sandwich and move forward when they do. This is O(n²) in the worst case because each student can be moved to the back many times.  
However, the **relative order of students doesn’t matter**—only preferences vs. available sandwiches.  
So, **count how many want 0's and 1's**. Move through the sandwiches one by one:  
- If there are still students who want the top sandwich, "feed" one (decrement counter).
- If not, stop—the rest of the sandwiches can’t be eaten, as no one left wants that type.  
Return the remaining count of students.

Choosing this optimized approach avoids O(n²) time and only needs O(n).

### Corner cases to consider  
- All students like only one type, but only the other type is served.
- Empty arrays (students or sandwiches).
- Only one student, one sandwich.
- Sandwich types not matching any student preference at any point.
- All students can be served (zero unable).
- Input arrays are already matched (no one rotates).

### Solution

```python
def countStudents(students, sandwiches):
    # Count how many students prefer 0 and 1
    count_zeros = sum(1 for s in students if s == 0)
    count_ones = len(students) - count_zeros

    # Go through each sandwich in order
    for sw in sandwiches:
        if sw == 0:
            if count_zeros == 0:
                # No zero-preferring students left
                # All remaining can't eat
                return count_ones
            count_zeros -= 1
        else:
            if count_ones == 0:
                # No one-preferring students left
                return count_zeros
            count_ones -= 1
    return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of students.  
  We loop once for counting, and up to n for processing sandwiches.
- **Space Complexity:** O(1) auxiliary, only a couple variables.  
  No extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where students can change their preference after failing to get their favorite sandwich?  
  *Hint: What new data structures or mechanisms do you need?*

- What if students can skip at most k times before leaving hungry?  
  *Hint: Track number of skips per student.*

- If more students arrive while sandwiches are being served, how would you update your solution?  
  *Hint: Allow dynamic queue and sandwich stack appending.*

### Summary
This problem uses the **hash/counting** pattern to optimize what appears to be a simulation problem. The key is to realize that only the count of each preference matters, not the individual order of students. This insight reduces simulation from O(n²) to O(n), a common pattern in queue/stack preference-matching problems. This approach is applicable in other problems where the order of agents is flexible and only aggregate preferences against a sequential supply matter.


### Flashcard
Count students who prefer each sandwich type; serve sandwiches in order, decrementing the matching student count until no more can be served—remaining students can't eat.

### Tags
Array(#array), Stack(#stack), Queue(#queue), Simulation(#simulation)

### Similar Problems
- Time Needed to Buy Tickets(time-needed-to-buy-tickets) (Easy)