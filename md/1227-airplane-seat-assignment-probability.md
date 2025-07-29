### Leetcode 1227 (Medium): Airplane Seat Assignment Probability [Practice](https://leetcode.com/problems/airplane-seat-assignment-probability)

### Description  
You have **n** passengers boarding an airplane with exactly **n** seats. Each passenger has a ticket with a seat number assigned, 1 through n.  
The **first passenger** has lost their ticket and chooses one of the n seats at random.  
All **subsequent passengers**:
- Will sit in their **own assigned seat** if it’s still available.
- If their seat is taken, they will pick a random seat from the remaining unoccupied seats.

**Question:**  
What is the probability that the **last passenger** (passenger n) sits in their own assigned seat (seat n)?


### Examples  

**Example 1:**  
Input: `n = 1`  
Output: `1.0`  
*Explanation: There’s only one seat; the first passenger has no choice but to sit in it. The probability the last passenger (also the first) gets their seat is 1.*

**Example 2:**  
Input: `n = 2`  
Output: `0.5`  
*Explanation:  
- Passenger 1 chooses seat 1 (probability 0.5): Passenger 2 takes their own seat 2.
- Passenger 1 chooses seat 2 (probability 0.5): Passenger 2’s seat is gone; they have to sit in seat 1.
So, the probability passenger 2 gets seat 2 is 0.5.*

**Example 3:**  
Input: `n = 3`  
Output: `0.5`  
*Explanation:  
Let’s enumerate possible seatings for passenger 1:  
- Picks seat 1 (probability 1/3): Everyone else gets their seat, so passenger 3 gets seat 3.
- Picks seat 2 (probability 1/3): Passenger 2 picks randomly between seat 1 and 3.
    - Picks seat 1 → passenger 3 gets seat 3.
    - Picks seat 3 → passenger 3 cannot get seat 3.
- Picks seat 3 (probability 1/3): Passenger 3 cannot get seat 3.
The ways that result in passenger 3 getting their seat occur with probability 1/3 + (1/3 × 1/2) = 0.5.*


### Thought Process (as if you’re the interviewee)  
Let’s try to build intuition and go step by step:

**Brute-force:**  
We could enumerate all possible choices or do a simulation, but the state space grows rapidly with n and is not scalable.

**Recursive Thinking:**  
Let’s define f(n) as the probability the nᵗʰ passenger gets their seat.

For n = 1, clearly f(1) = 1.

For n > 1:
- When the first passenger boards and picks randomly:
  - If the first passenger picks seat 1 (their own): everyone else sits in their expected seat, so passenger n gets their seat. Probability: 1/n.
  - If the first passenger picks seat n (last passenger’s seat): last passenger can never get their seat. Probability: 1/n.
  - If the first passenger picks seat k (where 2 ≤ k ≤ n-1): we have a subproblem—passenger k now becomes the “person who lost their ticket” in a plane with n-1 people. Probability: for each, 1/n.

It can be shown (with induction) that for all n > 1, the probability converges to 0.5.

Why? Each time, the success chance splits equally between an “automatic win” (first picks their own seat) and “automatic loss” (first picks the last seat), with recursive cases canceling out and averaging to 0.5.

**Optimal approach:**  
There’s no need for any simulation or dynamic programming—the answer for all n > 1 is **0.5**!


### Corner cases to consider  
- **n = 1**: Trivial single seat.
- **n = 2**: Two choices, both equally likely.
- **Very large n**: The formula still applies; avoid recursion or simulation.
- **Edge cases**: Negative or zero n (invalid input).


### Solution

```python
def nthPersonGetsNthSeat(n: int) -> float:
    # If only one passenger, they get their seat with certainty
    if n == 1:
        return 1.0
    # For n > 1, always 0.5 by math proof
    return 0.5
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  The answer depends only on n, and no loops or recursion are performed.

- **Space Complexity:** O(1).  
  No extra space is required beyond a couple of variables.


### Potential follow-up questions (as if you’re the interviewer)  

- What if, instead of only the first passenger, the first **k** passengers lost their tickets?
  *Hint: Try to model the induction and look for a new formula recursively.*

- How would you approach simulating the process for large n efficiently?
  *Hint: Consider Monte Carlo methods or random sampling.*

- Can you generalize the result if passengers appear out of order?
  *Hint: Explore the effect of order on the process structure.*


### Summary

This is a **brainteaser / math induction pattern**, not a typical simulation or dynamic programming problem. Recognizing the recursive pattern and how swaps “cancel out” for every n > 1 leads to a constant return. This simple probabilistic result can appear in problems involving random selections, recursive probability, or Markov processes.