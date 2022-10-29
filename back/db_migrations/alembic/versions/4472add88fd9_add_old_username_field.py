"""Add old_username field

Revision ID: 4472add88fd9
Revises: bd3a7cf57de1
Create Date: 2022-10-29 15:03:36.220350

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4472add88fd9'
down_revision = 'bd3a7cf57de1'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('member_website_migration', sa.Column('old_username', sa.String(), nullable=False))
    op.create_unique_constraint(None, 'member_website_migration', ['old_username'])
    op.add_column('members', sa.Column('old_username', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('members', 'old_username')
    op.drop_constraint(None, 'member_website_migration', type_='unique')
    op.drop_column('member_website_migration', 'old_username')
    # ### end Alembic commands ###