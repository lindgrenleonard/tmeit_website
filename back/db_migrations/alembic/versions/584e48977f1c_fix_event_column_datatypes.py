"""fix event column datatypes

Revision ID: 584e48977f1c
Revises: a7ed421f8063
Create Date: 2023-07-27 10:50:42.422240

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '584e48977f1c'
down_revision = 'a7ed421f8063'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('event_start', sa.DateTime(timezone=True), nullable=False))
    op.add_column('events', sa.Column('event_end', sa.DateTime(timezone=True), nullable=True))
    op.drop_column('events', 'event_date_start')
    op.drop_column('events', 'event_owner')
    op.drop_column('events', 'event_time_start')
    op.drop_column('events', 'event_date_end')
    op.drop_column('events', 'event_time_end')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('event_time_end', sa.VARCHAR(), autoincrement=False, nullable=True))
    op.add_column('events', sa.Column('event_date_end', sa.DATE(), autoincrement=False, nullable=True))
    op.add_column('events', sa.Column('event_time_start', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('events', sa.Column('event_owner', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('events', sa.Column('event_date_start', sa.DATE(), autoincrement=False, nullable=False))
    op.drop_column('events', 'event_end')
    op.drop_column('events', 'event_start')
    # ### end Alembic commands ###
