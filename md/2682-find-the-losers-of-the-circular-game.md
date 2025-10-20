### Leetcode 2682 (Easy): Find the Losers of the Circular Game [Practice](https://leetcode.com/problems/find-the-losers-of-the-circular-game)

### Description  
You are given `n` friends standing in a circle and a positive integer `k`. Starting from friend 1, the game passes a ball every round: in the pᵗʰ round, the ball is passed k × p positions forward (wrapping around the circle). When a friend receives the ball for the second time, the game ends. The friends who **never** received the ball during the game are the "losers". Return the list of these losers’ numbers in ascending order.

### Examples  

**Example 1:**  
Input: `n=5`, `k=2`  
Output: `[4,5]`  
*Explanation: The ball is passed as follows (friend numbers):  
- Start: 1  
- Round 1: 1 → (1 + 1×2 = 3) → 3  
- Round 2: 3 → (3 + 2×2 = 7) → 2 (since 7 modulo 5 = 2)  
- Round 3: 2 → (2 + 3×2 = 8) → 3 (modulo 5 = 3)  
The game ends since friend 3 gets the ball again.*  
*Friends 4 and 5 never got the ball.*

**Example 2:**  
Input: `n=4`, `k=4`  
Output: `[2,3,4]`  
*Explanation:  
- Start: 1  
- Round 1: 1 → (1 + 1×4 = 5) → 1 (modulo 4 = 1)  
The game immediately ends because friend 1 would get the ball again.*  
*Friends 2, 3, and 4 never got the ball.*

**Example 3:**  
Input: `n=3`, `k=1`  
Output: `[]`  
*Explanation:  
- Start: 1  
- Round 1: 1 → (1 + 1×1 = 2) → 2  
- Round 2: 2 → (2 + 2×1 = 4) → 1 (modulo 3 = 1)  
Game ends: friend 1 receives it again.*  
*All friends (1 and 2) received the ball, so losers=[] (no one).*

### Thought Process (as if you’re the interviewee)  

Let me simulate the process:  
- I'll use an array to track which friends have received the ball.
- Start from friend 1, passing the ball in increments of `k × p` (with p starting as 1), each time wrapping around using modulo n.
- At each pass, mark the receiver as having gotten the ball.
- Stop once a friend receives the ball for the second time.
- Friends with no marks are the losers.

The brute-force approach is fine since n is reasonably small, and each step is \( O(1) \).

Potential optimizations revolve around tracking with less space, but for a clarity-first solution, a boolean visitation array is clean and effective.

### Corner cases to consider  
- n = 1 → Only one friend; game ends instantly.
- k = 1 → Ball moves to next person each time.
- k > n → Test modulo logic.
- All friends get the ball before the repeat.
- k divisible by n → Ball stays at one person.
- The case where no one is a loser (everyone got the ball before a repeat).

### Solution

```python
def circularGameLosers(n, k):
    # Track which friends have received the ball
    received = [False] * n
    i = 0  # start from friend 1 (0-indexed)
    pass_num = 1
    while not received[i]:
        received[i] = True
        i = (i + pass_num * k) % n
        pass_num += 1
    # The losers are those who never received the ball
    return [idx + 1 for idx, got in enumerate(received) if not got]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Since each friend can be visited at most once before a repeat, and there are n friends.
- **Space Complexity:** O(n)  
  We use an extra array of size n to track received status.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you design the function to also return the order in which friends received the ball?  
  *Hint: Track the round number per friend.*

- What if the game continued until everyone received the ball at least once?  
  *Hint: Stop condition changes to all received at least once, not just a repeat.*

- How does the result change if the starting friend is not 1, but any arbitrary index?  
  *Hint: Make the starting index a parameter, handle initialization.*

### Summary
This solution uses the **simulation** and **boolean tracking** pattern. This is common for problems with circular iteration and "history of visitation", such as hot potato, Josephus problem, or rotational simulations. The method is robust for small or moderate n, simple to write, and easy to debug. It is widely applicable in interview problems with round-robin or repeated-process mechanics.


### Flashcard
Simulate passing the ball with step k × pass_number (mod n), mark receivers; stop when someone receives twice, return unmarked friends sorted.

### Tags
Array(#array), Hash Table(#hash-table), Simulation(#simulation)

### Similar Problems
- Find the Child Who Has the Ball After K Seconds(find-the-child-who-has-the-ball-after-k-seconds) (Easy)