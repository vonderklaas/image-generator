"""
Perceptron Classifier

A binary linear classifier based on the Perceptron learning algorithm.

Model:
    Input: x = (x1, x2, ..., xn)
    Linear Combination: z = w.T * x + b
    Activation Function (Unit Step):
        g(z) = 1 if z >= 0 else 0
"""

import numpy as np
from typing import Callable


class Perceptron:
    """
    Perceptron classifier.

    Parameters:
        learning_rate (float): The step size during weight updates.
        n_iters (int): Number of iterations over the training dataset.
    """

    def __init__(self, learning_rate: float = 0.01, n_iters: int = 1000):
        self.learning_rate = learning_rate
        self.n_iters = n_iters
        self.activation_function: Callable[[
            np.ndarray], np.ndarray] = self._unit_step_function
        self.weights: np.ndarray | None = None
        self.bias: float | None = None

    def fit(self, X: np.ndarray, y: np.ndarray) -> None:
        """
        Fit the model to the training data.

        Parameters:
            X (np.ndarray): Training samples of shape (n_samples, n_features).
            y (np.ndarray): Target values (binary: 0 or 1) of shape (n_samples,).
        """
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        self.bias = 0.0

        # Ensure labels are binary (0 or 1)
        y_transformed = np.where(y > 0, 1, 0)

        for _ in range(self.n_iters):
            for idx, x_i in enumerate(X):
                z = np.dot(x_i, self.weights) + self.bias
                y_pred = self.activation_function(z)
                error = y_transformed[idx] - y_pred

                # Weight and bias update
                self.weights += self.learning_rate * error * x_i
                self.bias += self.learning_rate * error

    def predict(self, X: np.ndarray) -> np.ndarray:
        """
        Predict binary labels for input samples.

        Parameters:
            X (np.ndarray): Input samples of shape (n_samples, n_features).

        Returns:
            np.ndarray: Predicted binary labels (0 or 1).
        """
        linear_output = np.dot(X, self.weights) + self.bias
        return self.activation_function(linear_output)

    @staticmethod
    def _unit_step_function(x: np.ndarray) -> np.ndarray:
        """
        Unit step activation function.

        Parameters:
            x (np.ndarray): Linear input.

        Returns:
            np.ndarray: Output after applying unit step function.
        """
        return np.where(x >= 0, 1, 0)
